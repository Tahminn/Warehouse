package com.payment.warehouse.user.controller;


import com.payment.warehouse.entity.AppUser;
import com.payment.warehouse.security.AppUserDetails;
import com.payment.warehouse.user.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;

@Controller
public class AccountController {

    private final UserService service;

    public AccountController(UserService service) {
        this.service = service;
    }

    @GetMapping("/account")
    public String viewDetails(@AuthenticationPrincipal AppUserDetails loggedUser,
                              Model model) {
        String email = loggedUser.getUsername();
        AppUser appUser = service.getByEmail(email);
        model.addAttribute("user", appUser);

        return "users/account_form";

    }

    @PostMapping("/account/update")
    public String saveDetails(AppUser appUser, RedirectAttributes redirectAttributes,
                              @AuthenticationPrincipal AppUserDetails loggedUser,
                              @RequestParam("image") MultipartFile multipartFile) throws IOException {

        if (!multipartFile.isEmpty()) {
            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            appUser.setPhotos(fileName);
            AppUser savedAppUser = service.updateAccount(appUser);

            String uploadDir = "appUser-photos/" + savedAppUser.getId();

//			FileUploadUtil.cleanDir(uploadDir);
//			FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);

        } else {
            if (appUser.getPhotos().isEmpty()) appUser.setPhotos(null);
            service.updateAccount(appUser);
        }

        loggedUser.setFirstName(appUser.getFirstName());
        loggedUser.setLastName(appUser.getLastName());

        redirectAttributes.addFlashAttribute("message", "Your account details have been updated.");

        return "redirect:/account";
    }
}
