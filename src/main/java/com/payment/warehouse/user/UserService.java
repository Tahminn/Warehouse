package com.payment.warehouse.user;

import com.payment.warehouse.entity.AppUser;
import com.payment.warehouse.entity.Role;
import com.payment.warehouse.paging.PagingAndSortingHelper;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@Transactional
public class UserService {
	public static final int USERS_PER_PAGE = 4;
	
	private final UserRepository userRepo;
	private final RoleRepository roleRepo;
	private final PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepo, RoleRepository roleRepo, PasswordEncoder passwordEncoder) {
		this.userRepo = userRepo;
		this.roleRepo = roleRepo;
		this.passwordEncoder = passwordEncoder;
	}

	public AppUser getByEmail(String email) {
		return userRepo.getUserByUsernameOrEmail(email);
	}
	
	public List<AppUser> listAll() {
		return (List<AppUser>) userRepo.findAll(Sort.by("firstName").ascending());
	}
	
	public void listByPage(int pageNum, PagingAndSortingHelper helper) {
		helper.listEntities(pageNum, USERS_PER_PAGE, userRepo);
	}
	
	public List<Role> listRoles() {
		return (List<Role>) roleRepo.findAll();
	}

	public AppUser save(AppUser appUser) {
		boolean isUpdatingUser = (appUser.getId() != null);
		
		if (isUpdatingUser) {
			AppUser existingAppUser = userRepo.findById(appUser.getId()).get();
			
			if (appUser.getPassword().isEmpty()) {
				appUser.setPassword(existingAppUser.getPassword());
			} else {
				encodePassword(appUser);
			}
			
		} else {		
			encodePassword(appUser);
		}
		
		return userRepo.save(appUser);
	}
	
	public AppUser updateAccount(AppUser appUserInForm) {
		AppUser appUserInDB = userRepo.findById(appUserInForm.getId()).get();
		
		if (!appUserInForm.getPassword().isEmpty()) {
			appUserInDB.setPassword(appUserInForm.getPassword());
			encodePassword(appUserInDB);
		}
		
		if (appUserInForm.getPhotos() != null) {
			appUserInDB.setPhotos(appUserInForm.getPhotos());
		}
		
		appUserInDB.setFirstName(appUserInForm.getFirstName());
		appUserInDB.setLastName(appUserInForm.getLastName());
		
		return userRepo.save(appUserInDB);
	}
	
	private void encodePassword(AppUser appUser) {
		String encodedPassword = passwordEncoder.encode(appUser.getPassword());
		appUser.setPassword(encodedPassword);
	}
	
	public boolean isEmailUnique(Integer id, String email) {
		AppUser appUserByEmail = userRepo.getUserByUsernameOrEmail(email);
		
		if (appUserByEmail == null) return true;
		
		boolean isCreatingNew = (id == null);
		
		if (isCreatingNew) {
			return false;
		} else {
            return Objects.equals(appUserByEmail.getId(), id);
		}
    }

	public AppUser get(Integer id) throws UserNotFoundException {
		try {
			return userRepo.findById(id).get();
		} catch (NoSuchElementException ex) {
			throw new UserNotFoundException("Could not find any user with ID " + id);
		}
	}
	
	public void delete(Integer id) throws UserNotFoundException {
		Long countById = userRepo.countById(id);
		if (countById == null || countById == 0) {
			throw new UserNotFoundException("Could not find any user with ID " + id);
		}
		
		userRepo.deleteById(id);
	}
	
	public void updateUserEnabledStatus(Integer id, boolean enabled) {
		userRepo.updateEnabledStatus(id, enabled);
	}
}
