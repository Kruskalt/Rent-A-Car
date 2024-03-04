const { fromDataToEntity } = require('../mapper/autoMapper');
const AutoIdNotDefinedError = require('./error/autoIdNotDefinedError');
const AbstractController = require('../../abstractController');

module.exports = class autoController extends AbstractController {
  /**
   * @param {import('../service/autoService')} autoService
   */
  constructor(uploadMiddleware, autoService) {
    super();
    this.ROUTE_BASE = '/auto';
    this.uploadMiddleware = uploadMiddleware;
    this.autoService = autoService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    // Nota: el `bind` es necesario porque estamos atando el callback a una función miembro de esta clase
    // y no a la clase en si.
    // Al hacer `bind` nos aseguramos que "this" dentro de `create` sea el controlador.
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.post(`${ROUTE}/save`, this.uploadMiddleware.single('crest-url'), this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const autos = await this.autoService.getAll();
    const { errors, messages } = req.session;
    res.render('auto/view/index.html', { data: {  autos }, messages, errors });
    req.session.errors = [];
    req.session.messages = [];
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async create(req, res) {
    res.render('auto/view/form.html');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async view(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new AutoIdNotDefinedError();
    }

    try {
      const auto = await this.autoService.getById(id);
      res.render('auto/view/form.html', { data: {  auto } });
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
      const auto = fromDataToEntity(req.body);
      if (req.file) {
        const { path } = req.file;
        auto.crestUrl = path;
      }
      const savedAuto = await this.autoService.save(auto);
      if (auto.id) {
        req.session.messages = [`El auto con id ${auto.id} se actualizó exitosamente`];
      } else {
        req.session.messages = [`Se creó el auto con id ${savedAuto.id} (${savedAuto.name})`];
      }
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