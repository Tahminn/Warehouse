package com.payment.warehouse.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "customers", indexes = {
    @Index(name = "idx_customers_code", columnList = "code", unique = true),
    @Index(name = "idx_customers_name", columnList = "name"),
    @Index(name = "idx_customers_is_active", columnList = "is_active")
})
@Getter @Setter
public class Customer extends BaseEntity {
    @Column(nullable = false, length = 50)
    private String code;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(name = "contact_person", length = 200)
    private String contactPerson;

    @Column(length = 200)
    private String email;

    @Column(length = 50)
    private String phone;

    @Column(length = 50)
    private String mobile;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String country;

    @Column(name = "tax_number", length = 50)
    private String taxNumber;

    @Column(name = "credit_limit", precision = 18, scale = 2)
    private BigDecimal creditLimit;

    @Column(name = "payment_terms", length = 200)
    private String paymentTerms;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
