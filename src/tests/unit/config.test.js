const checkJWT = require('../../config/startup');

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

describe('Verificar si existe una "JWT_SIGNATURE" en archivo ".env"', () => {
  it('- debería desplegar "ERROR TERMINAL: JWT_SIGNATURE no está definida." en la consola', () => {
    global.console = { error: jest.fn() };
    checkJWT();
    expect(console.error).toBeCalled();
    expect(console.error).toHaveBeenCalledWith(
      'ERROR TERMINAL: JWT_SIGNATURE no está definida.'
    );
  });
  it('- debería salir del proceso si no existe una "JWT_SIGNATURE" en ".env"', () => {
    checkJWT();
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
