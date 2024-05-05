const { fromDataToEntity } = require("../mapper/alquilerMapper");
const AlquilerIdNotDefinedError = require("./error/alquilerIdNotDefinedError");
const AbstractController = require("../../abstractController");

module.exports = class AlquilerController extends AbstractController {
  /**
   * @param {import('../service/alquilerService')} alquilerService
   */
  constructor(alquilerService, autoService, clienteService) {
    super();
    this.alquilerService = alquilerService;
    this.autoService = autoService;
    this.clienteService = clienteService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = "/alquiler";

    // Nota: el `bind` es necesario porque estamos atando el callback a una función miembro de esta clase
    // y no a la clase en si.
    // Al hacer `bind` nos aseguramos que "this" dentro de `create` sea el controlador.
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const alquileres = await this.alquilerService.getAll();
    const { errors, messages } = req.session;
    res.render("alquiler/view/index.html", {
      data: {alquileres} ,
      messages,
      errors,
    });
    req.session.errors = [];
    req.session.messages = [];
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async create(req, res) {
    const autos = await this.autoService.getAll();
    const clientes = await this.clienteService.getAll();
    if (autos.length > 0) {
      if (clientes.length > 0) {
        res.render("alquiler/view/form.html",{data: {autos,clientes}});
      }else{
        req.session.errors = ['Para crear un alquiler, primero debe crear un cliente'];
        res.redirect("/cliente");
      }
    }else{
      req.session.errors = ['Para crear un alquiler, primero debe crear un auto'];
      res.redirect("/auto");
    }
    
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async view(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new AlquilerIdNotDefinedError();
    }

    try {
      const alquiler = await this.alquilerService.getById(id);
      const autos = await this.autoService.getAll();
      const clientes = await this.clienteService.getAll();
      res.render("alquiler/view/form.html", { data: { autos,alquiler,clientes } });
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect("/alquiler");
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    try {
      const auto = await this.autoService.getById(req.body.auto_id)      
      let reqBody = req.body;
      reqBody.precioUnitario = auto.precio;
      reqBody.pagado = false
      const desde = reqBody.desde;
      // Dividir la cadena en día, mes y año
      const partesFechaDesde = desde.split("-");
      // Crear un objeto de fecha utilizando las partes
      const desdeFecha = new Date(partesFechaDesde[0], partesFechaDesde[1] , partesFechaDesde[2]);
      const hasta = reqBody.hasta;
      // Dividir la cadena en día, mes y año
      const partesFechaHasta = hasta.split("-");
      // Crear un objeto de fecha utilizando las partes
      
      const hastaFecha = new Date(partesFechaHasta[0], partesFechaHasta[1] , partesFechaHasta[2]);
      
      const diferenciaDias = Math.ceil((hastaFecha - desdeFecha) / (1000 * 60 * 60 * 24));
      
      reqBody.precioTotal = diferenciaDias * auto.precio;
      
      const alquiler = fromDataToEntity(reqBody);
      console.log("data a entidad",alquiler)
      const savedAlquiler = await this.alquilerService.save(alquiler);
      
      if (alquiler.id) {
        req.session.messages = [
          `El alquiler con id ${alquiler.id} se actualizó exitosamente`,
        ];
      } else {
        req.session.messages = [
          `Se creó el alquiler con id ${savedAlquiler.id} `,
        ];
      }
      res.redirect("/alquiler");
    } catch (e) {
      console.log("error",e)
      req.session.errors = [e.message];
      res.redirect("/alquiler");
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const alquiler = await this.alquilerService.getById(id);
      await this.alquilerService.delete(alquiler);
      req.session.messages = [`Se eliminó el alquiler ID: ${id}`];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect("/alquiler");
  }
};
