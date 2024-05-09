const AbstractAlquilerRepository = require('../abstactAlquilerRepository');
const AbstractAlquilerRepositoryError = require('../error/abstractAlquilerRepositoryError');

test('No se puede instanciar un repositorio abstracto', () => {
  let repoInstance;
  try {
    repoInstance = new AbstractAlquilerRepository();
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractAlquilerRepositoryError);
  } finally {
    expect(repoInstance).toBeUndefined();
  }
});

test('Se puede instanciar un repositorio concreto que herede del repositorio abstracto', () => {
  const ConcreteRepository = class extends AbstractAlquilerRepository {};
  const respositoryInstance = new ConcreteRepository();
  expect(respositoryInstance).toBeInstanceOf(ConcreteRepository);
  expect(respositoryInstance).toBeInstanceOf(AbstractAlquilerRepository);
});
