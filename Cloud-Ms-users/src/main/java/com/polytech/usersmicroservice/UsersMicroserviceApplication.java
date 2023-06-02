package com.polytech.usersmicroservice;

import com.polytech.usersmicroservice.entities.Role;
import com.polytech.usersmicroservice.entities.User;
import com.polytech.usersmicroservice.service.UserService;

import jakarta.annotation.PostConstruct;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class UsersMicroserviceApplication {

  @Autowired
  UserService userService;

  public static void main(String[] args) {
    SpringApplication.run(UsersMicroserviceApplication.class, args);
  }

   
  @PostConstruct
  void init_users() {
    
		//ajouter les rôles
		userService.addRole(new Role(null, "Admin"));
		userService.addRole(new Role(null, "Manager"));
		userService.addRole(new Role(null, "Collaborateur"));
		//ajouter les users
		userService.saveUser(new User(null, "admin", "Pass123", true, null));
		userService.saveUser(new User(null, "smail", "Pass123", true, null));
		userService.saveUser(new User(null, "m212327", "Pass123", true, null));
		//ajouter les rôles aux users
		userService.addRoleToUser("admin", "Admin");
		userService.addRoleToUser("smail", "Manager");
		userService.addRoleToUser("m212327", "Collaborateur");   
  }

  @Bean
  BCryptPasswordEncoder getBCE() {
    return new BCryptPasswordEncoder();
  }
}
