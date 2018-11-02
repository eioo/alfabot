import { Request, ResponseToolkit } from 'hapi';

const check = {
  handler: async (request: Request, h: ResponseToolkit) => {
    return 'ok';
  },
};

export { check };
