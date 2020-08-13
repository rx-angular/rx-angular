export const mockConsole = (methods?: ('log' | 'warn' | 'error')[]) => {
  if (methods) {
    return methods.forEach((m) => jest.spyOn(console, m).mockImplementation());
  }

  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
  jest.spyOn(console, 'error').mockImplementation();
};
