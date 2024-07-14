package com.payment.warehouse.security;

import com.payment.warehouse.entity.AppUser;
import com.payment.warehouse.entity.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

public class AppUserDetails implements UserDetails {
	@Serial
	private static final long serialVersionUID = 1L;
	private final AppUser appUser;


	public AppUserDetails(AppUser appUser) {
		this.appUser = appUser;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<Role> roles = appUser.getRoles();

		List<SimpleGrantedAuthority> authorities = new ArrayList<>();

		for (Role role : roles) {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		}

		return authorities;
	}

	@Override
	public String getPassword() {
		return appUser.getPassword();
	}

	@Override
	public String getUsername() {
		return appUser.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return appUser.isEnabled();
	}

	public String getFullname() {
		return this.appUser.getFirstName() + " " + this.appUser.getLastName();
	}

	public void setFirstName(String firstName) {
		this.appUser.setFirstName(firstName);
	}

	public void setLastName(String lastName) {
		this.appUser.setLastName(lastName);
	}

	public boolean hasRole(String roleName) {
		return appUser.hasRole(roleName);
	}
}
