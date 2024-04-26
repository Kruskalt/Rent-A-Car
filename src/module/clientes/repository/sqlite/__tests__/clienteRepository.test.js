const { Sequelize } = require("sequelize");
const fs = require("fs");
const ClienteRepository = require("../clienteRepository.js");
const Cliente = require("../../../entity/cliente.js");
const ClienteNotFoundError = require("../../error/clienteNotFoundError.js");
const ClienteIdNotDefinedError = require("../../error/clienteIdNotDefinedError.js");
const ClienteModel = require("../../../model/clienteModel.js");

let sequelize;

beforeEach(async () => {
  // Configurar la instancia de Sequelize con SQLite en memoria
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:", // Utiliza la base de datos en memoria
    logging: false, // Deshabilita los logs de Sequelize para las pruebas
  });

  await ClienteModel.setup(sequelize);

  await sequelize.sync();
});

test("Guardar un cliente nuevo genera un id", async () => {
  const repository = new ClienteRepository(ClienteModel);
  const cliente = await repository.save(
    new Cliente({
      nombre: "nazareno",
      apellido: "avalos",
      tipoDni: "dni",
      nroDni: 41460800,
      direccion: "espinosa",
      telefono: "33844810",
      email: "@example",
      nacimiento: "1998-10-16",
    })
  );
  console.log(cliente);
  expect(cliente.id).toEqual(1);
});

test("Guardar un cliente existente actualiza los valores", async () => {
  const repository = new ClienteRepository(ClienteModel);
  let cliente = await repository.save(
    new Cliente({
      nombre: "nazareno",
      apellido: "avalos",
      tipoDni: "dni",
      nroDni: 41460800,
      direccion: "espinosa",
      telefono: "33844810",
      email: "@example",
      nacimiento: "1998-10-16",
    })
  );
  console.log(cliente);
  expect(cliente.id).toEqual(1);

  cliente = await repository.save(
    new Cliente({
      id: 1,
      nombre: "mariano",
      apellido: "avalos",
      tipoDni: "dni",
      nroDni: 41460800,
      direccion: "espinosa",
      telefono: "33844810",
      email: "@example",
      nacimiento: "1998-10-16",
    })
  );
  expect(cliente.id).toEqual(1);
  expect(cliente.nombre).toEqual("mariano");
});
test("Eliminar auto elimina un auto existente", async () => {
  const repository = new ClienteRepository(ClienteModel);
  const nuevoCliente = await repository.save(
    new Cliente({
      marca: "ford",
      nombre: "nazareno",
      apellido: "avalos",
      tipoDni: "dni",
      nroDni: 41460800,
      direccion: "espinosa",
      telefono: "33844810",
      email: "@example",
      nacimiento: "1998-10-16",
    })
  );

  expect(nuevoCliente.id).toEqual(1);
  expect(await repository.delete(nuevoCliente)).toBe(true);
  await expect(repository.getById(1)).rejects.toThrow(ClienteNotFoundError);
});

test("Otener todos los clientes devuelve un array de entidad cliente", async () => {
  const repository = new ClienteRepository(ClienteModel);
  const nuevoCliente = await repository.save(
    new Cliente({
      nombre: "nazareno",
      apellido: "avalos",
      tipoDni: "dni",
      nroDni: 41460800,
      direccion: "espinosa",
      telefono: "33844810",
      email: "@example",
      nacimiento: "1998-10-16",
    })
  );
  const nuevoCliente2 = await repository.save(
    new Cliente({
      nombre: "mariano",
      apellido: "avalos",
      tipoDni: "dni",
      nroDni: 41460800,
      direccion: "espinosa",
      telefono: "33844810",
      email: "@example",
      nacimiento: "1998-10-16",
    })
  );

  const clientes = await repository.getAll();
  console.log(clientes)
  expect(clientes[0]).toMatchObject(nuevoCliente);
  expect(clientes[1]).toMatchObject(nuevoCliente2);
});
