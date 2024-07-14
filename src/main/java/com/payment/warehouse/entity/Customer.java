package com.payment.warehouse.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.apache.tomcat.websocket.AuthenticationType;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "customers")
//public class Customer extends AbstractAddressWithCountry {
public class Customer extends IdBasedEntity {

    @Column(nullable = false, unique = true, length = 45)
    private String email;

    @Column(nullable = false, length = 64)
    private String password;

    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    private boolean enabled;

    @Column(name = "created_time")
    private Date createdTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "authentication_type", length = 10)
    private AuthenticationType authenticationType;

    @Column(name = "reset_password_token", length = 30)
    private String resetPasswordToken;

    public Customer() {
    }

    public Customer(Integer id) {
        this.id = id;
    }

//    public String getFullName() {
//        return firstName + " " + lastName;
//    }

}
