const AlquilerController = require('../alquilerController');
const AutoController = require('../../../auto/controller/autoController');
const Alquiler = require('../../entity/alquiler');
const Auto = require('../../../auto/entity/auto');
const Cliente = require('../../../clientes/entity/cliente');


const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};

const autoController = new AutoController({},serviceMock)
const controller = new AlquilerController(serviceMock, serviceMock, serviceMock);

test('Index renderea index.html', async () => {
    const renderMock = jest.fn();
  
    await controller.index({ session: { errors: [], messages: [] } }, { render: renderMock });
  
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('alquiler/view/index.html', {
      data: { alquileres: [] },
      errors: [],
      messages: [],
    });
  });

test('Create muestra un error si no hay autos en el sistema', async () => {
    const mockRes = { redirect: jest.fn() };
    const mockReq = { session: {} };
    await controller.create(mockReq, mockRes);
    expect(mockRes.redirect).toHaveBeenCalledTimes(1);
    expect(mockReq.session.errors).toEqual(['Para crear un alquiler, primero debe crear un auto']);
  });
  test('Create muestra un error si no hay clientes, pero si hay autos en el sistema', async () => {
    const mockAutosData = [new Auto({ marca: "Toyota", modelo: "S", año: "2011", kms: 1111, color: "Rojo", aire: "Sí", pasajeros: 3, automatico: "No", manual: "Sí", precio: 400 })];
    serviceMock.getAll.mockImplementationOnce(() => mockAutosData);
    const mockRes = { redirect: jest.fn() };
    const mockReq = { session: {} };
    
    await controller.create(mockReq, mockRes);
    console.log(mockReq.session.errors)
    expect(mockRes.redirect).toHaveBeenCalledTimes(1);
    expect(mockReq.session.errors).toEqual(['Para crear un alquiler, primero debe crear un cliente']);
  });