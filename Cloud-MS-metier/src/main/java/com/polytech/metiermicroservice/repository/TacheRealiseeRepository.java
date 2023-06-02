package com.polytech.metiermicroservice.repository;

import com.polytech.metiermicroservice.model.*;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface TacheRealiseeRepository
  //"SELECT t, tr, c FROM Collaborateur c JOIN c.taches t JOIN TacheRealisee tr ON t.codeTache = tr.tacheRealiseePK.codeTache WHERE tr.tacheRealiseePK.codeCollab = :codeCollab"
  extends JpaRepository<TacheRealisee, TacheRealiseePK> {
  @Query(
    "SELECT t.codeTache,t.intituleTache,t.chargeHoraireTache, tr.chargeHorairePlanifiee,tr.chargeHoraireRealisee,tr.status,c.codeCollab,c.nom,c.prenom FROM Tache t JOIN TacheRealisee tr ON tr.tacheRealiseePK.codeTache = t.codeTache JOIN Collaborateur c ON c.codeCollab = tr.tacheRealiseePK.codeCollab WHERE t.projet.codeProjet = :codeProjet AND tr.tacheRealiseePK.codeCollab = :codeCollab"
  )
  List<Object[]> findByCollaborateur(@Param("codeProjet") Integer codeProjet,@Param("codeCollab") String codeCollab);

  @Query(
    "SELECT t.codeTache,t.intituleTache,t.chargeHoraireTache, tr.chargeHorairePlanifiee,tr.chargeHoraireRealisee,tr.status,c.codeCollab,c.nom,c.prenom FROM Tache t JOIN TacheRealisee tr ON tr.tacheRealiseePK.codeTache = t.codeTache JOIN Collaborateur c ON c.codeCollab = tr.tacheRealiseePK.codeCollab WHERE t.projet.codeProjet = :codeProjet"
  )
  List<Object[]> findByCollaborateurProjet(
    @Param("codeProjet") Integer codeProjet
  );

  @Query("SELECT COUNT(t) FROM TacheRealisee t WHERE t.status = :status")
  int countByStatus(@Param("status") String status);

  @Query(
    "SELECT  COUNT(tr) FROM Tache t JOIN TacheRealisee tr ON tr.tacheRealiseePK.codeTache = t.codeTache JOIN Collaborateur c ON c.codeCollab = tr.tacheRealiseePK.codeCollab WHERE tr.tacheRealiseePK.codeCollab = :codeCollab AND tr.status = :status"
  )
  int countTaskCollaborateur(@Param("codeCollab") String codeCollab,@Param("status") String status);

}
