const AlquilerService = require('../alquilerService');
const AlquilerNotDefinedError = require('../error/alquilerNotDefinedError');
const AlquilerIdNotDefinedError = require('../error/alquilerIdNotDefinedError');
const Alquiler = require('../../entity/alquiler');

const repositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const service = new AlquilerService(repositoryMock);

test('Guardar un alquiler llama al método save del repositorio 1 vez', () => {
  service.save({});
  expect(repositoryMock.save).toHaveBeenCalledTimes(1);
});

test('Llamar a guardar un alquiler sin pasar un equipo da un error específico', async () => {
  await expect(service.save).rejects.toThrowError(AlquilerNotDefinedError);
});

test('Eliminar un alquiler llama al método delete del repositorio 1 vez', () => {
  service.delete(new Alquiler({ id: 1 }));
  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
});

test('Llamar a eliminar un alquiler sin pasar un equipo da un error específico', async () => {
  await expect(service.delete).rejects.toThrowError(AlquilerNotDefinedError);
});

test('Consultar un alquiler por id llama al método get del repositorio 1 vez', () => {
  service.getById(1);
  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
});

test('Llamar a consultar un alquiler sin pasar un alquiler da un error específico', async () => {
  await expect(service.getById).rejects.toThrowError(AlquilerIdNotDefinedError);
});

test('Consultar todos los alquileres llama al método getAll del repositorio 1 vez', () => {
  service.getAll();
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});
