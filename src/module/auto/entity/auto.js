module.exports = class Auto {
    constructor({
      id,
      marca,
      modelo,
      año,
      kms,
      color,
      aire,
      pasajeros,
      manual,
      automatico,
      
    }) {
      this.id = id;
      this.marca = marca;
      this.modelo = modelo;
      this.año = año;
      this.kms = kms;
      this.color = color;
      this.aire = aire;
      this.pasajeros = pasajeros;
      this.manual = manual;
      this.automatico = automatico;
      
    }
  };