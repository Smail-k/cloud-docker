package com.polytech.metiermicroservice.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.Data;

@Embeddable
@Data
public class TacheRealiseePK implements Serializable {

  private int codeTache;
  private String codeCollab;
}
