interface DateTimestampProvider {
  delegate?: DateTimestampProvider;
  now(): number;
}

export const dateTimestampProvider: DateTimestampProvider = {
  now() {
    return (dateTimestampProvider.delegate || Date).now();
  },
};
