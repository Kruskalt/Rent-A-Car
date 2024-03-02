const Sqlite3Database = require('better-sqlite3');
const fs = require('fs');
const AutoRepository = require('../autoRepository.js');
const Auto = require('../../../entity/auto.js');
const AutoNotFoundError = require('../../error/autoNotFoundError.js');
const AutoIdNotDefinedError = require('../../error/autoIdNotDefinedError.js');

let mockDb;

beforeEach(() => {
  mockDb = new Sqlite3Database(':memory:'); //correrlo en memoria
  const migration = fs.readFileSync('./src/config/setup.sql', 'utf-8');
  mockDb.exec(migration);
});

test('Guardar un auto nuevo genera un id', () => {
  const repository = new AutoRepository(mockDb);
  const auto = repository.save(
    new Auto({
      
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
  const repository = new AutoRepository(mockDb);
  let auto = repository.save(
    new Auto({
      
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
    new Auto({
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
  const repository = new AutoRepository(mockDb);

  expect(() => {
    repository.save(
      new Auto({
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
  }).toThrowError(AutoNotFoundError);
});

test('Eliminar auto elimina un auto existente', () => {
  const repository = new AutoRepository(mockDb);
  const nuevoAuto = repository.save(
    new Auto({
      
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
  }).toThrow(AutoNotFoundError);
});


test('Otener todos los autos devuelve un array de entidad auto', () => {
  const repository = new AutoRepository(mockDb);
  const nuevoAuto = repository.save(
    new Auto({
      
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
    new Auto({
      
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