package com.polytech.metiermicroservice.model;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TacheRealisee {
	@EmbeddedId
	TacheRealiseePK tacheRealiseePK;
	private int chargeHorairePlanifiee;
	private int chargeHoraireRealisee;
	private String status;
	
}
