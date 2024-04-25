module.exports = class Cliente {
  constructor({
    id,
    nombre,
    apellido,
    tipoDni,
    nroDni,
    direccion,
    telefono,
    email,
    nacimiento,
  }) {
    this.id = parseInt(id,10);
    this.nombre = nombre;
    this.apellido = apellido;
    this.tipoDni = tipoDni;
    this.nroDni = parseInt(nroDni,10);
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.nacimiento = nacimiento;
  }
};
