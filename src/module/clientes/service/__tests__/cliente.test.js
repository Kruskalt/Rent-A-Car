const ClienteService = require('../clienteService');
const ClienteNotDefinedError = require('../error/clienteNotDefinedError');
const ClienteIdNotDefinedError = require('../error/clienteIdNotDefinedError');
const Cliente = require('../../entity/cliente');

const repositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const service = new ClienteService(repositoryMock);

test('Guardar un cliente llama al método save del repositorio 1 vez', () => {
  service.save({});
  expect(repositoryMock.save).toHaveBeenCalledTimes(1);
});

test('Llamar a guardar un cliente sin pasar un cliente da un error específico', async () => {
  await expect(service.save).rejects.toThrowError(ClienteNotDefinedError);
});

test('Eliminar un cliente llama al método delete del repositorio 1 vez', () => {
  service.delete(new Cliente({ id: 1 }));
  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
});

test('Llamar a eliminar un cliente sin pasar un cliente da un error específico', async () => {
  await expect(service.delete).rejects.toThrowError(ClienteNotDefinedError);
});

test('Consultar un cliente por id llama al método get del repositorio 1 vez', () => {
  service.getById(1);
  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
});

test('Llamar a consultar un cliente sin pasar un cliente da un error específico', async () => {
  await expect(service.getById).rejects.toThrowError(ClienteIdNotDefinedError);
});

test('Consultar todos los clientes llama al método getAll del repositorio 1 vez', () => {
  service.getAll();
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});
