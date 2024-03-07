module.exports = class Alquiler {
    constructor({
      hasta,
      desde,
      fk_auto,
      dni_usuario,
      telefono,
      mail
      
    }) {
  
      this.hasta = hasta;
      this.desde = desde;
      this.fkAuto = fk_auto;
      this.dniUsuario= dni_usuario;
      this.telefono = telefono;
      this.mail = mail;
      
    }
  };