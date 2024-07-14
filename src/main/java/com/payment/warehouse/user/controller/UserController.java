package com.payment.warehouse.user.controller;

import com.payment.warehouse.entity.AppUser;
import com.payment.warehouse.entity.Role;
import com.payment.warehouse.paging.PagingAndSortingHelper;
import com.payment.warehouse.paging.PagingAndSortingParam;
import com.payment.warehouse.user.UserNotFoundException;
import com.payment.warehouse.user.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.List;

@Controller
public class UserController {
	private String defaultRedirectURL = "redirect:/users/page/1?sortField=firstName&sortDir=asc";
	private final UserService service;

	public UserController(UserService service) {
		this.service = service;
	}

	@GetMapping("/users")
	public String listFirstPage() {
		return defaultRedirectURL;
	}
	
	@GetMapping("/users/page/{pageNum}")
	public String listByPage(
			@PagingAndSortingParam(listName = "listUsers", moduleURL = "/users") PagingAndSortingHelper helper,
			@PathVariable(name = "pageNum") int pageNum) {
		service.listByPage(pageNum, helper);		
		
		return "users/users";		
	}
	
	
	@GetMapping("/users/new")
	public String newUser(Model model) {
		List<Role> listRoles = service.listRoles();
		
		AppUser appUser = new AppUser();
		appUser.setEnabled(true);

		model.addAttribute("user", appUser);
		model.addAttribute("listRoles", listRoles);
		model.addAttribute("pageTitle", "Create New AppUser");
		
		return "users/user_form";
	}
	
	@PostMapping("/users/save")
	public String saveUser(AppUser appUser, RedirectAttributes redirectAttributes,
						   @RequestParam("image") MultipartFile multipartFile) throws IOException {
		
		if (!multipartFile.isEmpty()) {
			String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
			appUser.setPhotos(fileName);
			AppUser savedAppUser = service.save(appUser);
			
			String uploadDir = "appUser-photos/" + savedAppUser.getId();
			
//			AmazonS3Util.removeFolder(uploadDir);
//			AmazonS3Util.uploadFile(uploadDir, fileName, multipartFile.getInputStream());
		} else {
			if (appUser.getPhotos().isEmpty()) appUser.setPhotos(null);
			service.save(appUser);
		}
		
		
		redirectAttributes.addFlashAttribute("message", "The appUser has been saved successfully.");
		
		return getRedirectURLtoAffectedUser(appUser);
	}

	private String getRedirectURLtoAffectedUser(AppUser appUser) {
		String firstPartOfEmail = appUser.getEmail().split("@")[0];
		return "redirect:/users/page/1?sortField=id&sortDir=asc&keyword=" + firstPartOfEmail;
	}
	
	@GetMapping("/users/edit/{id}")
	public String editUser(@PathVariable(name = "id") Integer id, 
			Model model,
			RedirectAttributes redirectAttributes) {
		try {
			AppUser appUser = service.get(id);
			List<Role> listRoles = service.listRoles();
			
			model.addAttribute("user", appUser);
			model.addAttribute("pageTitle", "Edit AppUser (ID: " + id + ")");
			model.addAttribute("listRoles", listRoles);
			
			return "users/user_form";
		} catch (UserNotFoundException ex) {
			redirectAttributes.addFlashAttribute("message", ex.getMessage());
			return defaultRedirectURL;
		}
	}
	
	@GetMapping("/users/delete/{id}")
	public String deleteUser(@PathVariable(name = "id") Integer id, 
			Model model,
			RedirectAttributes redirectAttributes) {
		try {
			service.delete(id);
			String userPhotosDir = "user-photos/" + id;
//			AmazonS3Util.removeFolder(userPhotosDir);
			
			redirectAttributes.addFlashAttribute("message", 
					"The user ID " + id + " has been deleted successfully");
		} catch (UserNotFoundException ex) {
			redirectAttributes.addFlashAttribute("message", ex.getMessage());
		}
		
		return defaultRedirectURL;
	}
	
	@GetMapping("/users/{id}/enabled/{status}")
	public String updateUserEnabledStatus(@PathVariable("id") Integer id,
			@PathVariable("status") boolean enabled, RedirectAttributes redirectAttributes) {
		service.updateUserEnabledStatus(id, enabled);
		String status = enabled ? "enabled" : "disabled";
		String message = "The user ID " + id + " has been " + status;
		redirectAttributes.addFlashAttribute("message", message);
		
		return defaultRedirectURL;
	}
	
//	@GetMapping("/users/export/csv")
//	public void exportToCSV(HttpServletResponse response) throws IOException {
//		List<AppUser> listUsers = service.listAll();
//		UserCsvExporter exporter = new UserCsvExporter();
//		exporter.export(listUsers, response);
//	}
//
//	@GetMapping("/users/export/excel")
//	public void exportToExcel(HttpServletResponse response) throws IOException {
//		List<AppUser> listUsers = service.listAll();
//
//		UserExcelExporter exporter = new UserExcelExporter();
//		exporter.export(listUsers, response);
//	}
//
//	@GetMapping("/users/export/pdf")
//	public void exportToPDF(HttpServletResponse response) throws IOException {
//		List<AppUser> listUsers = service.listAll();
//
//		UserPdfExporter exporter = new UserPdfExporter();
//		exporter.export(listUsers, response);
//	}
}
