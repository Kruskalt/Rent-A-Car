const AutoService = require('../autoService');
const AutoNotDefinedError = require('../error/autoNotDefinedError');
const AutoIdNotDefinedError = require('../error/autoIdNotDefinedError');
const Auto = require('../../entity/auto');

const repositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const service = new AutoService(repositoryMock);

test('Guardar un auto llama al método save del repositorio 1 vez', () => {
  service.save({});
  expect(repositoryMock.save).toHaveBeenCalledTimes(1);
});

test('Llamar a guardar un auto sin pasar un auto da un error específico', async () => {
  await expect(service.save).rejects.toThrowError(AutoNotDefinedError);
});

test('Eliminar un auto llama al método delete del repositorio 1 vez', () => {
  service.delete(new Auto({ id: 1 }));
  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
});

test('Llamar a eliminar un auto sin pasar un auto da un error específico', async () => {
  await expect(service.delete).rejects.toThrowError(AutoNotDefinedError);
});

test('Consultar un auto por id llama al método get del repositorio 1 vez', () => {
  service.getById(1);
  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
});

test('Llamar a consultar un auto sin pasar un auto da un error específico', async () => {
  await expect(service.getById).rejects.toThrowError(AutoIdNotDefinedError);
});

test('Consultar todos los autos llama al método getAll del repositorio 1 vez', () => {
  service.getAll();
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});
