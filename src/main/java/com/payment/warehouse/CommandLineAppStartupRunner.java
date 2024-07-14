package com.payment.warehouse;

import com.payment.warehouse.entity.AppUser;
import com.payment.warehouse.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommandLineAppStartupRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminUsername = "Admin";
        String adminEmail = "tahmin.fatiyev@gmail.com";
        String adminPassword = "qwe123";
        String adminFirstName = "Tahmin";
        String adminLastName = "Fatiyev";
        var user = userRepository.getUserByUsernameOrEmail(adminUsername);
//        userRepository.delete(user);
//        user = userRepository.getUserByUsernameOrEmail(adminUsername);
        if (user == null) {
            AppUser admin = AppUser.withUsername(adminUsername)
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .firstName(adminFirstName)
                    .lastName(adminLastName)
                    .build();
            userRepository.save(admin);
        }
    }
}