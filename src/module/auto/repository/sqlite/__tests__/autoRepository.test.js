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