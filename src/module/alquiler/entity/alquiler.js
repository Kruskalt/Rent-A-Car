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
    updated_at: modificado,
    created_at: creado,
  }) {
    this.id = parseInt(id);
    this.hasta = hasta;
    this.desde = desde;
    /**
     * @type {import('../../auto/entity/auto');} this.auto
     */
    this.auto = auto;
    /**
     * @type {import('../../clientes/entity/cliente');} this.cliente
     */
    this.cliente = cliente;
    this.precioUnitario = precioUnitario;
    this.precioTotal = precioTotal;
    this.medioDePago = medioDePago;
    this.pagado = pagado;
    this.modificado = modificado;
    this.creado = creado;
  }
};
