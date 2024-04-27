const { fromDataToEntity } = require('../mapper/alquilerMapper');
const AlquilerIdNotDefinedError = require('./error/alquilerIdNotDefinedError');
const AbstractController = require('../../abstractController');

module.exports = class AlquilerController extends AbstractController {
  /**
   * @param {import('../service/alquilerService')} alquilerService
   */
  constructor(alquilerService) {
    super();
    this.alquilerService = alquilerService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = '/alquiler';

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
    const alquiler = await this.alquilerService.getAll();
    const { errors, messages } = req.session;
    res.render('alquiler/view/index.html', { data: { areas: alquiler }, messages, errors });
    req.session.errors = [];
    req.session.messages = [];
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async create(req, res) {
    res.render('alquiler/view/form.html');
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
      res.render('alquiler/view/form.html', { data: { alquiler: alquiler } });
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/alquiler');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    try {
      const alquiler = fromDataToEntity(req.body);
      const savedAlquiler = await this.alquilerService.save(alquiler);
      if (alquiler.id) {
        req.session.messages = [`El alquiler con id ${alquiler.id} se actualizó exitosamente`];
      } else {
        req.session.messages = [`Se creó el alquiler con id ${savedAlquiler.id} `];
      }
      res.redirect('/alquiler');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/alquiler');
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
    res.redirect('/alquiler');
  }
};