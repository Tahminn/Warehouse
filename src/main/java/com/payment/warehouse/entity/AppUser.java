package com.payment.warehouse.entity;

import com.payment.warehouse.Constants;
import com.payment.warehouse.security.AppUserDetails;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;

import java.util.*;
import java.util.function.Function;

import static org.apache.logging.log4j.util.Strings.EMPTY;

@Setter
@Getter
@Entity
@Table(name = "users")
public class AppUser extends IdBasedEntity implements UserDetails {

    @Column(length = 128, nullable = false, unique = true)
    private String username;

    @Column(length = 128, nullable = false, unique = true)
    private String email;

    @Column(length = 64, nullable = false)
    private String password;

    @Column(name = "first_name", length = 45, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 45, nullable = false)
    private String lastName;

    @Column(length = 64)
    private String photos;

    private boolean accountNonExpired;

    private boolean accountNonLocked;

    private boolean credentialsNonExpired;

    private boolean enabled;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

//    public  AppUser(boolean accountExpired, boolean accountLocked, boolean credentialsExpired, boolean enabled) {
//        this.accountExpired = accountExpired;
//        this.accountLocked = accountLocked;
//        this.credentialsExpired = credentialsExpired;
//        this.enabled = enabled;
//    }
//
//    public AppUser(String username, String password, Collection<? extends GrantedAuthority> authorities, boolean accountExpired, boolean accountLocked, boolean credentialsExpired, boolean enabled) {
//        this(username, password, true, true, true, true, authorities);
//        this.accountExpired = accountExpired;
//        this.accountLocked = accountLocked;
//        this.credentialsExpired = credentialsExpired;
//        this.enabled = enabled;
//    }

//    public AppUser() {
//        this(username, password, true, true, true, true);
//    }

    public AppUser() {
    }

    public AppUser(String username, String email, String password) {
        this(username, email, password, EMPTY, EMPTY, true, true, true, true);
    }

    public AppUser(String username, String email, String password, String firstName, String lastName) {
        this(username, email, password, firstName, lastName, true, true, true, true);
    }

    public AppUser(String username, String email, String password, String firstName, String lastName, boolean enabled, boolean accountNonExpired,
                   boolean credentialsNonExpired, boolean accountNonLocked) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        Assert.isTrue(username != null && !username.isEmpty() && password != null,
                "Cannot pass null or empty values to constructor");
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.accountNonExpired = accountNonExpired;
        this.credentialsNonExpired = credentialsNonExpired;
        this.accountNonLocked = accountNonLocked;
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }

    @Override
    public String toString() {
        return "AppUser [id=" + id + ", email=" + email + ", firstName=" + firstName + ", lastName=" + lastName
                + ", roles=" + roles + "]";
    }

    @Transient
    public String getPhotosImagePath() {
        if (id == null || photos == null) return "/images/default-user.png";

        return Constants.S3_BASE_URI + "/user-photos/" + this.id + "/" + this.photos;
    }

    @Transient
    public String getFullName() {
        return firstName + " " + lastName;
    }

    public boolean hasRole(String roleName) {

        for (Role role : roles) {
            if (role.getName().equals(roleName)) {
                return true;
            }
        }

        return false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Role> setRoles = this.getRoles();

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        for (Role role : setRoles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }

        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    public static AppUserBuilder withUsername(String username) {
        return builder().username(username);
    }

    public static AppUserBuilder builder() {
        return new AppUserBuilder();
    }

    public static final class AppUserBuilder {

        private String username;

        private String email;

        private String password;

        private String firstName;

        private String lastName;

//        private List<GrantedAuthority> authorities = new ArrayList<>();

        private boolean accountExpired;

        private boolean accountLocked;

        private boolean credentialsExpired;

        private boolean disabled;

        private Function<String, String> passwordEncoder = password -> password;

        private AppUserBuilder() {
        }

        public AppUserBuilder email(String email) {
            Assert.notNull(email, "email cannot be null");
            this.email = email;
            return this;
        }

        public AppUserBuilder username(String username) {
            Assert.notNull(username, "username cannot be null");
            this.username = username;
            return this;
        }

        public AppUserBuilder password(String password) {
            Assert.notNull(password, "password cannot be null");
            this.password = password;
            return this;
        }

        public AppUserBuilder firstName(String firstName) {
            Assert.notNull(firstName, "first name cannot be null");
            this.firstName = firstName;
            return this;
        }

        public AppUserBuilder lastName(String lastName) {
            Assert.notNull(lastName, "last name cannot be null");
            this.lastName = lastName;
            return this;
        }

        public AppUserBuilder passwordEncoder(Function<String, String> encoder) {
            Assert.notNull(encoder, "encoder cannot be null");
            this.passwordEncoder = encoder;
            return this;
        }

        public AppUserBuilder accountExpired(boolean accountExpired) {
            this.accountExpired = accountExpired;
            return this;
        }


        public AppUserBuilder accountLocked(boolean accountLocked) {
            this.accountLocked = accountLocked;
            return this;
        }


        public AppUserBuilder credentialsExpired(boolean credentialsExpired) {
            this.credentialsExpired = credentialsExpired;
            return this;
        }


        public AppUserBuilder disabled(boolean disabled) {
            this.disabled = disabled;
            return this;
        }

        public AppUser build() {
            String encodedPassword = this.passwordEncoder.apply(this.password);
            return new AppUser(this.username,this.email, encodedPassword);
        }

//        public UserDetails build() {
//            String encodedPassword = this.passwordEncoder.apply(this.password);
//            return new AppUser(this.username,this.email, encodedPassword);
//        }
//        public AppUserBuilder roles(String... roles) {
//            List<GrantedAuthority> authorities = new ArrayList<>(roles.length);
//            for (String role : roles) {
//                Assert.isTrue(!role.startsWith("ROLE_"),
//                        () -> role + " cannot start with ROLE_ (it is automatically added)");
//                authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
//            }
//            return authorities(authorities);
//        }
//
//
//        public AppUserBuilder authorities(GrantedAuthority... authorities) {
//            Assert.notNull(authorities, "authorities cannot be null");
//            return authorities(Arrays.asList(authorities));
//        }
        //        public AppUserBuilder authorities(Collection<? extends GrantedAuthority> authorities) {
//            Assert.notNull(authorities, "authorities cannot be null");
//            this.authorities = new ArrayList<>(authorities);
//            return this;
//        }

//        public AppUserBuilder authorities(String... authorities) {
//            Assert.notNull(authorities, "authorities cannot be null");
//            return authorities(AuthorityUtils.createAuthorityList(authorities));
//        }

    }
}
