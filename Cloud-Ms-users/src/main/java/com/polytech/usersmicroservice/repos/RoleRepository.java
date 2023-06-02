package com.polytech.usersmicroservice.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polytech.usersmicroservice.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRole(String role);
}
