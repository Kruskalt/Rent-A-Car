const ClienteController = require('../clienteController');
const Cliente = require('../../entity/cliente');


const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};

const controller = new ClienteController({}, serviceMock);

test('Index renderea index.html', async () => {
    const renderMock = jest.fn();
  
    await controller.index({ session: { errors: [], messages: [] } }, { render: renderMock });
  
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('clientes/view/index.html', {
      data: { clientes: [] },
      errors: [],
      messages: [],
    });
  });

test('Create renderea form.html', async () => {
    const renderMock = jest.fn();
    
    await controller.create({}, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('clientes/view/form.html')
  });
  
  test('Save llama al servicio con el body y redirecciona a /cliente', async () => {
    const redirectMock = jest.fn();
    const bodyMock = new Cliente({
      id: undefined,
      nombre: undefined,
      apellido: undefined,
      tipoDni: undefined,
      nroDni: undefined,
      direccion: undefined,
      telefono: undefined,
      email: undefined,
      nacimiento: undefined,
    });
  
    
    await controller.save(
      { body: bodyMock, session: {} },
      { redirect: redirectMock }
    );
    
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(serviceMock.save).toHaveBeenCalledWith(bodyMock);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/cliente');
  });
  
  test('Delete llama al servicio con el id del body y redirecciona a /cliente', async () => {
    const FAKE_CLIENTE = new Cliente({ id: 1 });
    serviceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_CLIENTE));
    const redirectMock = jest.fn();
  
    await controller.delete({ params: { id: 1 }, session: {} }, { redirect: redirectMock });
  
    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(serviceMock.delete).toHaveBeenCalledWith(FAKE_CLIENTE);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/cliente');
  });
  