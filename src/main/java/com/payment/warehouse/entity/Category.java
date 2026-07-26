package com.payment.warehouse.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "categories", indexes = {
    @Index(name = "idx_categories_code", columnList = "code", unique = true),
    @Index(name = "idx_categories_parent_id", columnList = "parent_category_id"),
    @Index(name = "idx_categories_path", columnList = "path"),
    @Index(name = "idx_categories_is_active", columnList = "is_active")
})
public class Category extends BaseEntity {

    @Column(length = 50)
    private String code;

    @Column(length = 128, nullable = false)
    private String name;

    @Column(length = 128)
    private String alias;

    @Column(length = 300)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_category_id")
    private Category parentCategory;

    @OneToMany(mappedBy = "parentCategory")
    @OrderBy("name asc")
    private Set<Category> subCategories = new HashSet<>();

    @Column
    private Integer level = 0;

    @Column(length = 500)
    private String path;

    @Column(name = "all_parent_ids", length = 500)
    private String allParentIDs;

    @Column(length = 128)
    private String image;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CategoryTranslation> translations = new ArrayList<>();

    @Transient
    private boolean hasChildren;

    // Alias methods for compatibility
    public Category getParent() {
        return parentCategory;
    }

    public void setParent(Category parent) {
        this.parentCategory = parent;
    }

    public Set<Category> getChildren() {
        return subCategories;
    }

    public void setChildren(Set<Category> children) {
        this.subCategories = children;
    }

    // Static copy methods
    public static Category copyFull(Category category) {
        return copyFull(category, category.getName());
    }

    public static Category copyFull(Category category, String name) {
        Category copy = new Category();
        copy.setId(category.getId());
        copy.setName(name);
        copy.setImage(category.getImage());
        copy.setHasChildren(category.getChildren().size() > 0);
        return copy;
    }

    public static Category copyIdAndName(Category category) {
        return copyIdAndName(category.getId(), category.getName());
    }

    public static Category copyIdAndName(Integer id, String name) {
        Category copy = new Category();
        copy.setId(id);
        copy.setName(name);
        return copy;
    }
}
