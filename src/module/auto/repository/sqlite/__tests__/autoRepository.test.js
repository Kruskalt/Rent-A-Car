const { Sequelize } = require("sequelize");
const fs = require("fs");
const AutoRepository = require("../autoRepository.js");
const Auto = require("../../../entity/auto.js");
const AutoNotFoundError = require("../../error/autoNotFoundError.js");
const AutoIdNotDefinedError = require("../../error/autoIdNotDefinedError.js");
const AutoModel = require("../../../model/autoModel.js");

let sequelize; // Declarar una variable para la instancia de Sequelize

beforeEach(async() => {
  // Configurar la instancia de Sequelize con SQLite en memoria
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:", // Utiliza la base de datos en memoria
    logging: false, // Deshabilita los logs de Sequelize para las pruebas
  });

  await AutoModel.setup(sequelize);

  await sequelize.sync();
});


test("Guardar un auto nuevo genera un id", async () => {
  const repository = new AutoRepository(AutoModel);
  const auto = await repository.save(
    new Auto({
      marca: "chevrolet",
      modelo: "s",
      año: "2020",
      kms: 3000,
      color: "rojo",
      aire: "si",
      pasajeros: 4,
      manual: 1,
      automatico: 0,
    })
  );
  console.log(auto);
  expect(auto.id).toEqual(1);
});

test("Guardar un auto existente actualiza los valores", async () => {
  const repository = new AutoRepository(AutoModel);
  let auto = await repository.save(
    new Auto({
      marca: "chevrolet",
      modelo: "s",
      año: "2020",
      kms: 3000,
      color: "rojo",
      aire: "si",
      pasajeros: 4,
      manual: 1,
      automatico: 0,
    })
  );
  console.log(auto);
  expect(auto.id).toEqual(1);

  auto = await repository.save(
    new Auto({
      id: 1,
      marca: "ford",
      modelo: "s",
      año: "2020",
      kms: 3000,
      color: "negro",
      aire: "si",
      pasajeros: 4,
      manual: 1,
      automatico: 0,
    })
  );
  expect(auto.id).toEqual(1);
  expect(auto.marca).toEqual("ford");
});



test("Eliminar auto elimina un auto existente", async () => {
  const repository = new AutoRepository(AutoModel);
  const nuevoAuto = await repository.save(
    new Auto({
      marca: "ford",
      modelo: "s",
      año: "2020",
      kms: 3000,
      color: "rojo",
      aire: "si",
      pasajeros: 4,
      manual: 1,
      automatico: 0,
    })
  );

  expect(nuevoAuto.id).toEqual(1);
  const deleteResult = await repository.delete(nuevoAuto);
   
  await expect(repository.getById(1)).rejects.toThrow(AutoNotFoundError);//Dado que getById es una función asincrónica, necesitas esperar a que se resuelva la promesa antes de hacer la aserción.
});

test("Otener todos los autos devuelve un array de entidad auto", async () => {
  const repository = new AutoRepository(AutoModel);
  const nuevoAuto = await repository.save(
    new Auto({
      marca: "ford",
      modelo: "s",
      año: "2020",
      kms: 3000,
      color: "rojo",
      aire: "si",
      pasajeros: 4,
      manual: 1,
      automatico: 0,
    })
  );
  const nuevoAuto2 = await repository.save(
    new Auto({
      marca: "chevrolet",
      modelo: "s",
      año: "2020",
      kms: 3000,
      color: "azul",
      aire: "si",
      pasajeros: 6,
      manual: 0,
      automatico: 1,
    })
  );
  const autos = await repository.getAll();
  console.log(autos)
  expect(autos[0]).toMatchObject(nuevoAuto);
  expect(autos[1]).toMatchObject(nuevoAuto2);
});
