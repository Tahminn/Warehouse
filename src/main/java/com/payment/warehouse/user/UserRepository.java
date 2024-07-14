package com.payment.warehouse.user;


import com.payment.warehouse.entity.AppUser;
import com.payment.warehouse.paging.SearchRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends SearchRepository<AppUser, Integer> {
    @Query("SELECT u FROM AppUser u WHERE u.username = :usernameOrEmail OR u.email = :usernameOrEmail")
    public AppUser getUserByUsernameOrEmail(@Param("usernameOrEmail") String usernameOrEmail);

    public Long countById(Integer id);

    @Query("SELECT u FROM AppUser u WHERE CONCAT(u.id, ' ', u.email, ' ', u.firstName, ' '," + " u.lastName) LIKE %?1%")
    public Page<AppUser> findAll(String keyword, Pageable pageable);

    @Query("UPDATE AppUser u SET u.enabled = ?2 WHERE u.id = ?1")
    @Modifying
    public void updateEnabledStatus(Integer id, boolean enabled);
}
