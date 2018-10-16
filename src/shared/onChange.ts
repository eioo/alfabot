export function onChange(object: object, callback: () => void) {
  const handler = {
    get(target: any, property: any, receiver: any): any {
      try {
        return new Proxy(target[property], handler);
      } catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },

    defineProperty(target: any, property: any, descriptor: any) {
      callback();
      return Reflect.defineProperty(target, property, descriptor);
    },

    deleteProperty(target: any, property: any) {
      callback();
      return Reflect.deleteProperty(target, property);
    },
  };

  return new Proxy(object, handler);
};
