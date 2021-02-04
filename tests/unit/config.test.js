const checkJWT = require('../../startup/config');
const chalk = require('chalk');

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

describe('Verificar si existe una "jwtPrivateKey" en archivo ".env"', () => {
  it('- debería desplegar "ERROR TERMINAL: jwtPrivateKey no esta definida." en la consola', () => {
    global.console = { error: jest.fn() };
    checkJWT();
    expect(console.error).toBeCalled();
    expect(console.error).toHaveBeenCalledWith(
      chalk.red('ERROR TERMINAL: jwtPrivateKey no esta definida.')
    );
  });
  it('- debería salir del proceso si no existe una "jwtPrivateKey" en ".env"', () => {
    checkJWT();
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
