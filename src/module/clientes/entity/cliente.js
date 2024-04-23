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
    this.id = id;
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
