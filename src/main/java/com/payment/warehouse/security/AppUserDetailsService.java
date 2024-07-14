package com.payment.warehouse.security;

import com.payment.warehouse.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {

        var appUser = userRepo.getUserByUsernameOrEmail(usernameOrEmail);

        if (appUser == null) {
            throw new UsernameNotFoundException("Could not find appUser with username or email: " + usernameOrEmail);
        }

        return new AppUserDetails(appUser);
    }
}
