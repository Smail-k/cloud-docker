package com.polytech.metiermicroservice.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue(value="Manager")

public class Manager extends Collaborateur{
	//private int nombreProjet;	


}
