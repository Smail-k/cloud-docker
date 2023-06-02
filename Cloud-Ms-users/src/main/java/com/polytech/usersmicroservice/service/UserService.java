package com.polytech.usersmicroservice.service;

import java.util.List;

import com.polytech.usersmicroservice.entities.Role;
import com.polytech.usersmicroservice.entities.User;

public interface UserService {

    User saveUser(User user);
    User findUserByUsername (String username);
    Role addRole(Role role);
    User addRoleToUser(String username, String rolename);
    List<User> findAllUsers();
}
