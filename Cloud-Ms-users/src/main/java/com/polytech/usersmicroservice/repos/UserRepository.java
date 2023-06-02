package com.polytech.usersmicroservice.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polytech.usersmicroservice.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
