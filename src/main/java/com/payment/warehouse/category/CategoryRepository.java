package com.payment.warehouse.category;


import com.payment.warehouse.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT c FROM Category c WHERE c.parentCategory.id IS NULL")
    List<Category> findRootCategories(Sort sort);

    @Query("SELECT c FROM Category c WHERE c.parentCategory.id IS NULL")
    List<Category> findRootCategories();

    @Query("SELECT c FROM Category c WHERE c.parentCategory.id IS NULL")
    Page<Category> findRootCategories(Pageable pageable);

    @Query("SELECT c FROM Category c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', ?1, '%'))")
    Page<Category> search(String keyword, Pageable pageable);

    @Query("SELECT c FROM Category c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', ?1, '%')) OR LOWER(COALESCE(c.code, '')) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Category> search(String keyword);

    Long countById(Integer id);

    Category findByName(String name);

    Category findByAlias(String alias);

    List<Category> findByParentCategoryId(Integer parentCategoryId);

    @Query("UPDATE Category c SET c.isActive = ?2 WHERE c.id = ?1")
    @Modifying
    void updateEnabledStatus(Integer id, boolean enabled);
}
