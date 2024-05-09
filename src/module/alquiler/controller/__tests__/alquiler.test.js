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
const serviceMockAuto = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};
const serviceMockCliente = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};

const autoController = new AutoController({},serviceMock)
const controller = new AlquilerController(serviceMock, serviceMockAuto, serviceMockCliente);

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
  test('Create muestra un error si no hay clientes en el sistema', async () => {
    const mockAutosData = [new Auto({ marca: "Toyota", modelo: "S", año: "2011", kms: 1111, color: "Rojo", aire: "Sí", pasajeros: 3, automatico: "No", manual: "Sí", precio: 400 })];
    serviceMockAuto.getAll.mockImplementationOnce(() => mockAutosData);
    const mockRes = { redirect: jest.fn() };
    const mockReq = { session: {} };
    
    await controller.create(mockReq, mockRes);
    
    expect(mockRes.redirect).toHaveBeenCalledTimes(1);
    expect(mockReq.session.errors).toEqual(['Para crear un alquiler, primero debe crear un cliente']);
  });

  test('Create renderea form.html', async () => {
    const renderMock = jest.fn();
    const mockAutosData = [new Auto({ id:1 ,marca: "Toyota", modelo: "S", año: "2011", kms: 1111, color: "Rojo", aire: "Sí", pasajeros: 3, automatico: "No", manual: "Sí", precio: 400 })];
    const mockClientesData = [new Cliente({id:1,nombre:"nazareno",apellido:"avalos",tipoDni:"dni",nroDni:41460800,direccion:"esp",telefono:"1133333",email:"mail",nacimiento:"nac"})]
    const mockAlquileresData = [new Alquiler({auto:new Auto({id:1, marca: "Toyota", modelo: "S", año: "2011", kms: 1111, color: "Rojo", aire: "Sí", pasajeros: 3, automatico: "No", manual: "Sí", precio: 400 }),cliente: new Cliente({id:1,nombre:"nazareno",apellido:"avalos",tipoDni:"dni",nroDni:41460800,direccion:"esp",telefono:"1133333",email:"mail",nacimiento:"nac"}),precioUnitario:555,desde:"2-3-3333",hasta:"2-3-3333",created_at:null,medioDePago:"d",pagado:false,precioTotal:50000,updated_at:null})];
    serviceMockAuto.getAll.mockImplementationOnce(() => mockAutosData);
    
    serviceMockCliente.getAll.mockImplementationOnce(() => mockClientesData);
    serviceMock.getAll.mockImplementationOnce(() => mockAlquileresData);
    await controller.create({}, { render: renderMock });
  
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('alquiler/view/form.html', {
      data: { clientes : mockClientesData, autos: mockAutosData},
    });
  });

  test('Save llama al servicio con el body y redirecciona a /alquiler', async () => {
    const redirectMock = jest.fn();
    const bodyMock = new Alquiler({
    auto: new Auto({
      id: undefined,
      marca: undefined,
      modelo: undefined,
      año: undefined,
      kms: undefined,
      color: undefined,
      aire: undefined,
      pasajeros: undefined,
      automatico: undefined,
      manual: undefined,
      precio:undefined,
    }),
    cliente: new Cliente({
      id:undefined,
      nombre: undefined,
      apellido: undefined,
      tipoDni: undefined,
      nroDni: undefined,
      direccion: undefined,
      telefono: undefined,
      email: undefined,
      nacimiento: undefined,
    }),
    id: 1 ,
    precioUnitario: 555,
    desde: "2-3-3333",
    hasta: "2-3-3333",
    created_at: undefined,
    medioDePago: "d",
    pagado: false,
    precioTotal: 50000,
    updated_at: undefined,
  });
  bodyMock.desde= "3333-2-2" //para que ande la funcion split 
  bodyMock.hasta= "3333-2-2"
    
    await controller.save(
      { body: bodyMock, session: {} },
      { redirect: redirectMock }
    );
    bodyMock.desde= new Date(bodyMock.desde) //el servicio devuelve un tipo date por eso lo vuelvo a convertir
    bodyMock.hasta= new Date(bodyMock.hasta)
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(serviceMock.save).toHaveBeenCalledWith(bodyMock);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/alquiler');
  });
  
  test('Delete llama al servicio con el id del body y redirecciona a /alquiler', async () => {
    const FAKE_ALQUILER = new Alquiler({ id: 1 });
    serviceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_ALQUILER));
    const redirectMock = jest.fn();
  
    await controller.delete({ params: { id: 1 }, session: {} }, { redirect: redirectMock });
  
    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(serviceMock.delete).toHaveBeenCalledWith(FAKE_ALQUILER);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/alquiler');
  });
  