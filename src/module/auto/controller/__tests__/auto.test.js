const AutoController = require('../autoController');
const Auto = require('../../entity/auto');


const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};

const controller = new AutoController({},serviceMock)

test('Index renderea index.html', async () => {
    const renderMock = jest.fn();
  
    await controller.index({ session: { errors: [], messages: [] } }, { render: renderMock });
  
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('auto/view/index.html', {
      data: { autos: [] },
      errors: [],
      messages: [],
    });
  });

test('Create renderea form.html', async () => {
    const renderMock = jest.fn();
    
    await controller.create({}, { render: renderMock });
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('auto/view/form.html')
  });
  
  test('Save llama al servicio con el body y redirecciona a /auto', async () => {
    const redirectMock = jest.fn();
    const bodyMock = new Auto({
      id: undefined,
      marca: undefined,
      modelo: undefined,
      año: undefined,
      kms: undefined,
      color: undefined,
      aire: undefined,
      pasajeros: undefined,
      automatico: "si",
      manual: "no",
      precio:undefined,
    });
  
    
    await controller.save(
      { body: bodyMock, session: {} },
      { redirect: redirectMock }
    );
    bodyMock.manual = 0
    bodyMock.automatico = 1
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(serviceMock.save).toHaveBeenCalledWith(bodyMock);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/auto');
  });
  
  test('Delete llama al servicio con el id del body y redirecciona a /auto', async () => {
    const FAKE_AUTO = new Auto({ id: 1 });
    serviceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_AUTO));
    const redirectMock = jest.fn();
  
    await controller.delete({ params: { id: 1 }, session: {} }, { redirect: redirectMock });
  
    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(serviceMock.delete).toHaveBeenCalledWith(FAKE_AUTO);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/auto');
  });
  