export class Manager implements Iterable<string> {
  codeCollab: string;
  nom: string;
  prenom: string;
  motPasse: string;

  constructor(codeCollab: string, nom: string, prenom: string, motPasse: string) {
    this.codeCollab = codeCollab;
    this.nom = nom;
    this.prenom = prenom;
    this.motPasse = motPasse;
  }

  *[Symbol.iterator]() {
    yield this.codeCollab;
    yield this.nom;
    yield this.prenom;
    yield this.motPasse;
  }
}