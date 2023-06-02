export class TacheRealisee implements Iterable<string> {
    codeTache: number;
    intituleTache: string;
    chargeHoraireTache: number;
    chargeHorairePlanifiee:number;
    status:string;
    codeCollab:string;
    nom: string;
    prenom: string;
  
    constructor(codeTache: number, intituleTache:string, chargeHoraireTache:number, chargeHorairePlanifiee:number, status:string, codeCollab: string, nom: string, prenom: string) {
      this.codeTache = codeTache;
      this.intituleTache = intituleTache;
      this.chargeHoraireTache = chargeHoraireTache;
      this.chargeHorairePlanifiee = chargeHorairePlanifiee;
      this.status = status;
      this.codeCollab = codeCollab;
      this.nom = nom;
      this.prenom = prenom;
    }
  
    *[Symbol.iterator](): Iterator<string> {
      yield this.codeTache.toString();
      yield this.intituleTache;
      yield this.chargeHoraireTache.toString();
      yield this.chargeHorairePlanifiee.toString();
      yield this.status;
      yield this.codeCollab;
      yield this.nom;
      yield this.prenom;
    }
  }