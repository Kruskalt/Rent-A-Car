module.exports = class Cliente {
  constructor({
    nombre,
    apellido,
    tipoDni,
    nroDni,
    direccion,
    telefono,
    email,
    nacimiento,
  }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.tipoDni = tipoDni;
    this.nroDni = nroDni;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.nacimiento = nacimiento;
  }
};
