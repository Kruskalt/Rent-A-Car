const Sqlite3Database = require('better-sqlite3');
const fs = require('fs');
const ClienteRepository = require('../clienteRepository.js');
const Cliente = require('../../../entity/cliente.js');
const ClienteNotFoundError = require('../../error/clienteNotFoundError.js');
const ClienteIdNotDefinedError = require('../../error/clienteIdNotDefinedError.js');

let mockDb;

beforeEach(() => {
  mockDb = new Sqlite3Database(':memory:'); //correrlo en memoria
  const migration = fs.readFileSync('./src/config/setup.sql', 'utf-8');
  mockDb.exec(migration);
});

test('Guardar un auto nuevo genera un id', () => {
  const repository = new ClienteRepository(mockDb);
  const auto = repository.save(
    new Cliente({
      
      marca: 'chevrolet',
      modelo: 's',
      año: '2020',
      kms: 3000,
      color: 'rojo',
      aire: 'si',
      pasajeros: 4,
      manual: 1,
      automatico: 0,
    })
  );
  console.log(auto)
  expect(auto.id).toEqual(1);
});


test('Guardar un club existente actualiza los valores', () => {
  const repository = new ClienteRepository(mockDb);
  let auto = repository.save(
    new Cliente({
      
      marca: 'chevrolet',
      modelo: 's',
      año: '2020',
      kms: 3000,
      color: 'rojo',
      aire: 'si',
      pasajeros: 4,
      manual: 1,
      automatico: 0,
    })
  );
  console.log(auto)
  expect(auto.id).toEqual(1);

  auto = repository.save(
    new Cliente({
      id:1,
      marca: 'ford',
      modelo: 's',
      año: '2020',
      kms: 3000,
      color: 'rojo',
      aire: 'si',
      pasajeros: 4,
      manual: 1,
      automatico: 0,
    })
  );
  expect(auto.id).toEqual(1);
  expect(auto.marca).toEqual("ford");
});

test('Guardar un auto con id que no existe da error', () => {
  const repository = new ClienteRepository(mockDb);

  expect(() => {
    repository.save(
      new Cliente({
        id:1,
      marca: 'ford',
      modelo: 's',
      año: '2020',
      kms: 3000,
      color: 'rojo',
      aire: 'si',
      pasajeros: 4,
      manual: 1,
      automatico: 0,
      })
    );
  }).toThrowError(ClienteNotFoundError);
});

test('Eliminar auto elimina un auto existente', () => {
  const repository = new ClienteRepository(mockDb);
  const nuevoAuto = repository.save(
    new Cliente({
      
      marca: 'ford',
      modelo: 's',
      año: '2020',
      kms: 3000,
      color: 'rojo',
      aire: 'si',
      pasajeros: 4,
      manual: 1,
      automatico: 0,
    })
  );

  expect(nuevoAuto.id).toEqual(1);
  expect(repository.delete(nuevoAuto)).toBe(true);
  expect(() => {
    repository.getById(1);
  }).toThrow(ClienteNotFoundError);
});


test('Otener todos los autos devuelve un array de entidad auto', () => {
  const repository = new ClienteRepository(mockDb);
  const nuevoAuto = repository.save(
    new Cliente({
      
      marca: 'ford',
      modelo: 's',
      año: '2020',
      kms: 3000,
      color: 'rojo',
      aire: 'si',
      pasajeros: 4,
      manual: 1,
      automatico: 0,
    })
  );
  const nuevoAuto2 = repository.save(
    new Cliente({
      
      marca: 'chevrolet',
      modelo: 's',
      año: '2020',
      kms: 3000,
      color: 'azul',
      aire: 'si',
      pasajeros: 6,
      manual: 0,
      automatico: 1,
    })
  );

  expect(repository.getAll()).toEqual([nuevoAuto, nuevoAuto2]);
});