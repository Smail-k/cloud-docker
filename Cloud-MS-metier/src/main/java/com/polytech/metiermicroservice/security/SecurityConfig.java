package com.polytech.metiermicroservice.security;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf()
      .disable()
      .sessionManagement()
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .cors().configurationSource(new CorsConfigurationSource() {
        @Override
        public CorsConfiguration getCorsConfiguration(HttpServletRequest
       request) {
        CorsConfiguration config = new CorsConfiguration();
       
       config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.setExposedHeaders(Arrays.asList("Authorization"));
        config.setMaxAge(3600L);
        return config;
        }
        }).and()
      .authorizeHttpRequests()
      //Consulter tous les projets
      .requestMatchers("*", "/**")
      .permitAll()
       //ajouter un nouveau projet
       .requestMatchers(HttpMethod.POST, "/projet/new/**")
       .hasAnyAuthority("Admin")
       //Consulter la liste des manager 
       .requestMatchers(HttpMethod.GET, "/collaborateur/only-manager/**")
       .hasAnyAuthority("Admin")
       //Ajouter un nouveau collaborateur 
       .requestMatchers(HttpMethod.POST, "/collaborateur/new/**")
       .hasAnyAuthority("Admin")
       //Ajouter un manager 
       .requestMatchers(HttpMethod.POST, "/collaborateur/newManager/**")
       .hasAnyAuthority("Admin")
       //Affecter tache aux collaborateur collaborateur/affectTacheCollaborateur
       .requestMatchers(HttpMethod.POST, "/collaborateur/affectTacheCollaborateur/**")
       .hasAnyAuthority("Manager")
       //Valider une tâche collaborateur/validerTache
       .requestMatchers(HttpMethod.POST, "/collaborateur/validerTache/**")
       .hasAnyAuthority("Manager")
       //Ajouter une nouvelle tâche tache/new-save
       .requestMatchers(HttpMethod.POST, "/tache/new-save/**")
       .hasAnyAuthority("Manager")
       //Mettre à jour une tache tache/update-new
       .requestMatchers(HttpMethod.POST, "/tache/update-new/**")
       .hasAnyAuthority("Manager","Collaborateur")
       //Supprimer une tache tache/delete
       .requestMatchers(HttpMethod.DELETE, "/tache/delete/**")
       .hasAnyAuthority("Manager")
       //Supprimer une tache tacherealisee/delete-pk
       .requestMatchers(HttpMethod.DELETE, "/tacherealisee/delete-pk/**")
       .hasAnyAuthority("Manager")
       //Valider une tâche collaborateur/doneTask
       .requestMatchers(HttpMethod.POST, "/collaborateur/doneTask/**")
       .hasAnyAuthority("Collaborateur")
       //Consulter tâches réalisée tache/tache-rea-projet/
       .requestMatchers(HttpMethod.GET, "/tache/tache-rea-projet/**")
       .hasAnyAuthority( "Manager","Collaborateur")
       //Consulter tâches réalisé tache/tache-rea
       .requestMatchers(HttpMethod.GET, "/tache/tache-rea/**")
       .hasAnyAuthority( "Collaborateur")
       //Supprimer un collaborateur 
       .requestMatchers(HttpMethod.DELETE, "/collaborateur/delete/**")
       .hasAnyAuthority("Admin")
       //supprimer un projet
       .requestMatchers(HttpMethod.DELETE, "/projet/delete/**")
       .hasAnyAuthority("Admin")
      //consulter le nombre de projet
      .requestMatchers(HttpMethod.POST, "/projet/count/**")
      .hasAnyAuthority("Admin")
      //Consulter le nombre des collaborateurs
      .requestMatchers(HttpMethod.GET, "/collaborateur/count/**")
      .hasAnyAuthority("Admin", "Manager")
      //Consulter le nombre de taches tacherealisee/countTask
      .requestMatchers(HttpMethod.GET, "/tacherealisee/countTask/**")
      .hasAnyAuthority("Collaborateur")
      //Consulter le nombre des tâches réalisées
      .requestMatchers(HttpMethod.GET, "/tacherealisee/count/**")
      .hasAnyAuthority("Admin", "Manager","Collaborateur")
      .anyRequest()
      .authenticated().and()
      .addFilterBefore(new JWTAuthorizationFilter(),BasicAuthenticationFilter.class);
    return http.build();
  }
}
