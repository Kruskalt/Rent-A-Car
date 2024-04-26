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
      precio,
      
    }) {
      this.id = parseInt(id);
      this.marca = marca;
      this.modelo = modelo;
      this.año = año;
      this.kms = parseInt(kms);
      this.color = color;
      this.aire = aire;
      this.pasajeros = parseInt(pasajeros);
      this.manual = manual;
      this.automatico = automatico;
      this.precio = precio;
      
    }
  };