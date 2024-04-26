module.exports = class Alquiler {
    constructor({
      id,
      auto,
      cliente,
      precioUnitario,
      desde,
      hasta,
      precioTotal,
      medioDePago,
      pagado,
    }) {
      this.id = id;
      this.hasta = hasta;
      this.desde = desde;
      this.auto = auto;
      this.cliente= cliente;
      this.precioUnitario = precioUnitario;
      this.precioTotal = precioTotal;
      this.medioDePago = medioDePago;
      this.pagado = pagado;
    }
  };