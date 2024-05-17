const AbstractClienteRepository = require('../abstactClienteRepository');
const AbstractClienteRepositoryError = require('../error/abstractClienteRepositoryError');

test('No se puede instanciar un repositorio abstracto', () => {
  let repoInstance;
  try {
    repoInstance = new AbstractClienteRepository();
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractClienteRepositoryError);
  } finally {
    expect(repoInstance).toBeUndefined();
  }
});

test('Se puede instanciar un repositorio concreto que herede del repositorio abstracto', () => {
  const ConcreteRepository = class extends AbstractClienteRepository {};
  const respositoryInstance = new ConcreteRepository();
  expect(respositoryInstance).toBeInstanceOf(ConcreteRepository);
  expect(respositoryInstance).toBeInstanceOf(AbstractClienteRepository);
});
