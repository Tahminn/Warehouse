package com.payment.warehouse.security;

import com.payment.warehouse.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//import com.payment.warehouse.entity.AppUser;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final AppUserDetailsService userDetailsService;
//    private final UserRepository userRepo;

//    @Bean
//    AppUserDetailsService userDetailsService() {
//        InMemoryUserDetailsManager userDetailsService = new InMemoryUserDetailsManager();
////        UserDetails user = AppUser.withUsername("javainuse").password("javainuse").authorities("read").build();
//        UserDetails user = AppUser.withUsername("javainuse").password("javainuse").build();
//        userDetailsService.createUser(user);
//        return userDetailsService;
//    }

//    @Bean
//    public UserDetailsService userDetailsService() {
//        return userDetailsService;
//    }


//	@Bean
//	public AuthenticationManager authManager(HttpSecurity http) throws Exception {
//		return http.getSharedObject(AuthenticationManagerBuilder.class)
//				.authenticationProvider(authProvider())
//				.build();
//	}


//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.authenticationProvider(authenticationProvider());
//	}

//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		http.csrf(AbstractHttpConfigurer::disable)
//				.securityContext((securityContext) -> securityContext.requireExplicitSave(true))
//		    .authorizeRequests()
//			.antMatchers("/states/list_by_country/**").hasAnyAuthority("Admin", "Salesperson")
//			.antMatchers("/users/**", "/settings/**", "/countries/**", "/states/**").hasAuthority("Admin")
//			.antMatchers("/categories/**", "/brands/**").hasAnyAuthority("Admin", "Editor")
//
//			.antMatchers("/products/new", "/products/delete/**").hasAnyAuthority("Admin", "Editor")
//
//			.antMatchers("/products/edit/**", "/products/save", "/products/check_unique")
//				.hasAnyAuthority("Admin", "Editor", "Salesperson")
//
//			.antMatchers("/products", "/products/", "/products/detail/**", "/products/page/**")
//				.hasAnyAuthority("Admin", "Editor", "Salesperson", "Shipper")
//
//			.antMatchers("/products/**").hasAnyAuthority("Admin", "Editor")
//
//			.antMatchers("/orders", "/orders/", "/orders/page/**", "/orders/detail/**").hasAnyAuthority("Admin", "Salesperson", "Shipper")
//
//			.antMatchers("/products/detail/**", "/customers/detail/**").hasAnyAuthority("Admin", "Editor", "Salesperson", "Assistant")
//
//			.antMatchers("/customers/**", "/orders/**", "/get_shipping_cost", "/reports/**").hasAnyAuthority("Admin", "Salesperson")
//
//			.antMatchers("/orders_shipper/update/**").hasAuthority("Shipper")
//
//			.antMatchers("/reviews/**").hasAnyAuthority("Admin", "Assistant")
//
//			.anyRequest().authenticated()
//			.and()
//			.formLogin()
//				.loginPage("/login")
//				.usernameParameter("email")
//				.permitAll()
//			.and().logout().permitAll()
//			.and()
//				.rememberMe()
//					.key("AbcDefgHijKlmnOpqrs_1234567890")
//					.tokenValiditySeconds(7 * 24 * 60 * 60);
//					;
//			http.headers().frameOptions().sameOrigin();
//	}

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .securityContext(securityContext -> securityContext.requireExplicitSave(true))
                .authorizeHttpRequests(authz ->authz.anyRequest().permitAll()
//                        .authorizeHttpRequests(authz ->authz.anyRequest().authenticated()

//                    authz.requestMatchers(HttpMethod.GET, "/roleHierarchy")
//                            .hasRole("STAFF")
//                            .requestMatchers("/login*", "/logout*", "/signin/**", "/s ignup/**", "/customLogin", "/user/registration*", "/registrationConfirm*", "/expiredAccount*", "/registration*", "/badUser*", "/user/resendRegistrationToken*", "/forgetPassword*",
//                                    "/user/resetPassword*", "/user/savePassword*", "/updatePassword*", "/user/changePassword*", "/emailError*", "/resources/**", "/old/user/registration*", "/successRegister*", "/qrcode*", "/user/enableNewLoc*")
//                            .permitAll()
//                            .requestMatchers("/invalidSession*")
//                            .anonymous()
//                            .requestMatchers("/user/updatePassword*")
//                            .hasAuthority("CHANGE_PASSWORD_PRIVILEGE")
//                            .requestMatchers("/console")
//                            .hasAuthority("READ_PRIVILEGE")
//                            .anyRequest()
//                            .hasAuthority("READ_PRIVILEGE");
                )
                .formLogin(formLogin -> formLogin
                        .loginPage("/login")
                        .usernameParameter("usernameOrEmail")
                        .passwordParameter("password")
                        .defaultSuccessUrl("/",true)
                        .failureUrl("/login?error=true")
//						.successHandler(myAuthenticationSuccessHandler)
//						.failureHandler(authenticationFailureHandler)
//						.authenticationDetailsSource(authenticationDetailsSource)
                        .permitAll())
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .permitAll())
                .rememberMe(me -> me
                        .key("1234567890_aBcDeFgHiJkLmNoPqRsTuVwXyZ")
                        .tokenValiditySeconds(14 * 24 * 60 * 60))
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS));
//		.formLogin()
//				.loginPage("/login")
//				.usernameParameter("email")
//				.permitAll()
//			.and().logout().permitAll()
//			.and()
//				.rememberMe()
//					.key("AbcDefgHijKlmnOpqrs_1234567890")
//					.tokenValiditySeconds(7 * 24 * 60 * 60);

//				.sessionManagement((sessionManagement) -> sessionManagement.invalidSessionUrl("/invalidSession.html")
//						.maximumSessions(1)
//						.sessionRegistry(sessionRegistry()))
//				.logout((logout) -> logout.logoutSuccessHandler(myLogoutSuccessHandler)
//						.invalidateHttpSession(true)
//						.logoutSuccessUrl("/logout.html?logSucc=true")
//						.deleteCookies("JSESSIONID")
//						.permitAll())
//				.rememberMe((remember) -> remember.rememberMeServices(rememberMeServices()));

        return http.build();
    }

//    @Bean
//    @Order(0)
//    SecurityFilterChain resources(HttpSecurity http) throws Exception {
//        http
//                .requestMatchers((matchers) -> matchers.antMatchers("/static/**"))
//                .authorizeHttpRequests((authorize) -> authorize.anyRequest().permitAll())
//                .requestCache().disable()
//                .securityContext().disable()
//                .sessionManagement().disable();
//        return http.build();
//    }
//	@Override
//	public void configure(WebSecurity web) throws Exception {
//		web.ignoring().requestMatchers("/images/**", "/js/**", "/webjars/**");
//	}

//    @Bean
//    public UserDetailsService userDetailsService() {
//        return new AppUserDetailsService(userRepo);
//    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(11);
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers(new AntPathRequestMatcher("/images/**"),
                        new AntPathRequestMatcher("/js/**"),
                        new AntPathRequestMatcher("/style.css"),
                        new AntPathRequestMatcher("/libs/**"),
                        new AntPathRequestMatcher("/resources/**"),
                        new AntPathRequestMatcher("/h2/**"));
    }
}
