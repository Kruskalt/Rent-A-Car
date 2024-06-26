const { Sequelize } = require("sequelize");
const fs = require("fs");
const AutoRepository = require("../autoRepository.js");
const AutoEntity = require("../../../entity/auto.js");
const AutoNotFoundError = require("../../error/autoNotFoundError.js");
const AutoIdNotDefinedError = require("../../error/autoIdNotDefinedError.js");
const AutoModel = require("../../../model/autoModel.js");
const sequelizeInstance = new Sequelize('sqlite::memory');

/**
 * @type AutoRepository
 */
let repository;
const sampleAuto = new AutoEntity({
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
})
beforeAll(() => {
  const Auto = AutoModel.setup(sequelizeInstance);
  repository = new AutoRepository(Auto);
});
beforeEach(async (done) => {
  await sequelizeInstance.sync({ force: true });
  done();
});


test("Guardar un auto nuevo genera un id", async () => {
  const NEW_AUTOGENERATED_ID = 1;
  const newAuto = await repository.save(sampleAuto);
  expect(newAuto.id).toEqual(NEW_AUTOGENERATED_ID);
});

test("Guardar un auto existente actualiza los valores", async () => {
  const NEW_AUTOGENERATED_ID = 1;
  const newAuto = await repository.save(sampleAuto);
  expect(newAuto.id).toEqual(NEW_AUTOGENERATED_ID);

  newAuto.color = "violetita";
  console.log(newAuto);
  const modifiedAuto = await repository.save(newAuto);
  expect(modifiedAuto.id).toEqual(NEW_AUTOGENERATED_ID);
  expect(modifiedAuto.color).toEqual("violetita");
});



test("Eliminar auto elimina un auto existente", async () => {
  const NEW_AUTOGENERATED_ID = 1;
  const newAuto = await repository.save(sampleAuto);
  expect(newAuto.id).toEqual(NEW_AUTOGENERATED_ID);
  await expect(repository.delete(newAuto)).resolves.toEqual(true);
  await expect(repository.getById(NEW_AUTOGENERATED_ID)).rejects.toThrow(AutoNotFoundError);
});



test("Otener todos los autos devuelve un array de entidad auto", async () => {
  const repository = new AutoRepository(AutoModel);
  const nuevoAuto = await repository.save(
    new AutoEntity({
      marca: "ford",
      modelo: "s",
      año: "2020",
      kms: 3000,
      color: "rojo",
      aire: "si",
      pasajeros: 4,
      manual: 1,
      automatico: 0,
      precio: 3000
    })
  );
  const nuevoAuto2 = await repository.save(
    new AutoEntity({
      marca: "chevrolet",
      modelo: "s",
      año: "2020",
      kms: 3000,
      color: "azul",
      aire: "si",
      pasajeros: 6,
      manual: 0,
      automatico: 1,
      precio: 4000
    })
  );
  const autos = await repository.getAll();
  console.log(autos)
  expect(autos[0]).toMatchObject(nuevoAuto);
  expect(autos[1]).toMatchObject(nuevoAuto2);
});
