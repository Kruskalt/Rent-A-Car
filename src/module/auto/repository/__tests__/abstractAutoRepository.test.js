const AbstractAutoRepository = require('../abstactAutoRepository');
const AbstractAutoRepositoryError = require('../error/abstractAutoRepositoryError');

test('No se puede instanciar un repositorio abstracto', () => {
  let repoInstance;
  try {
    repoInstance = new AbstractAutoRepository();
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractAutoRepositoryError);
  } finally {
    expect(repoInstance).toBeUndefined();
  }
});

test('Se puede instanciar un repositorio concreto que herede del repositorio abstracto', () => {
  const ConcreteRepository = class extends AbstractAutoRepository {};
  const respositoryInstance = new ConcreteRepository();
  expect(respositoryInstance).toBeInstanceOf(ConcreteRepository);
  expect(respositoryInstance).toBeInstanceOf(AbstractAutoRepository);
});
