const { fromDataToEntity } = require('../mapper/clienteMapper');
const ClienteIdNotDefinedError = require('./error/clienteIdNotDefinedError');
const AbstractController = require('../../abstractController');

module.exports = class clienteController extends AbstractController {
  /**
   * @param {import('../service/clienteService')} clienteService
   */
  constructor( clienteService) {
    super();  
    this.clienteService = clienteService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = '/cliente';

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
    const clientes = await this.clienteService.getAll();
    const { errors, messages } = req.session;
    res.render('clientes/view/index.html', { data: {  clientes }, messages, errors });
    req.session.errors = [];
    req.session.messages = [];
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async create(req, res) {
    res.render('clientes/view/form.html');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async view(req, res) {
    const { id } = req.params;
    
    if (!id) {
      throw new ClienteIdNotDefinedError();
    }

    try {
      const cliente = await this.clienteService.getById(id);
      
      res.render('clientes/view/form.html', { data: {  cliente: cliente } });
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/cliente');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async rent(req, res) {
    const { id } = req.params;
    
    if (!id) {
      throw new ClienteIdNotDefinedError();
    }

    try {
      const auto = await this.autoService.getById(id);
      const alquileres= await this.autoService.getAllRentById(id)
      console.log(alquileres)
      res.render('auto/view/alquiler.html', { data: {  auto , alquileres} });
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/auto');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async rented(req, res) {
    try {
      const alquiler = alquilerMapper.fromDataToEntity(req.body);
      console.log("estoy en autoController rented", req.body)
      console.log("estoy en autoController rented este es el alquiler", alquiler)
      const savedAlquiler = await this.autoService.rent(alquiler);
      req.session.messages = [`Se creó el alquiler con exito`];     
      res.redirect('/auto');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/auto');
    }
  }


  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    try {
      const cliente = fromDataToEntity(req.body);
      console.log("estoy en clienteController save", req.body)
      
      const savedCliente = await this.clienteService.save(cliente);
      if (cliente.id) {
        req.session.messages = [`El cliente con id ${cliente.id} se actualizó exitosamente`];
      } else {
        req.session.messages = [`Se creó el cliente con id ${savedCliente.id} (${savedCliente.name})`];
      }
      res.redirect('/cliente');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/cliente');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const auto = await this.autoService.getById(id);
      await this.autoService.delete(auto);
      req.session.messages = [`Se eliminó el auto ID: ${id} (${auto.name})`];
    } catch (e) {
      req.session.errors = [e.message, e.stack];
    }
    res.redirect('/auto');
  }
};