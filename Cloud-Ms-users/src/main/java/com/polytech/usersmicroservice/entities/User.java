package com.polytech.usersmicroservice.entities;

import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long user_id;

  @Column(unique = true)
  private String username;

  private String password;
  private Boolean enabled;

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(
    name = "user_role",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  private List<Role> roles;

public Long getUser_id() {
	return user_id;
}

public void setUser_id(Long user_id) {
	this.user_id = user_id;
}

public String getUsername() {
	return username;
}

public void setUsername(String username) {
	this.username = username;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public Boolean getEnabled() {
	return enabled;
}

public void setEnabled(Boolean enabled) {
	this.enabled = enabled;
}

public List<Role> getRoles() {
	return roles;
}

public void setRoles(List<Role> roles) {
	this.roles = roles;
}

public User(Long user_id, String username, String password, Boolean enabled, List<Role> roles) {
	super();
	this.user_id = user_id;
	this.username = username;
	this.password = password;
	this.enabled = enabled;
	this.roles = roles;
}

public User() {
	super();
}
  
  
}
