export const mockConsole = (methods?: ('log' | 'warn' | 'error')[]) => {
  if (methods) {
    return methods.forEach((m) =>
      vi.spyOn(console, m).mockImplementation(() => undefined),
    );
  }

  vi.spyOn(console, 'log').mockImplementation(() => undefined);
  vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
};
