import { Request, RequestQuery, ResponseToolkit } from 'hapi';

const listCities = {
  handler: async () => {
    return [
      {
        name: 'Lahti',
      },
      {
        name: 'Helsinki',
      },
    ];
  },
};

export { listCities };
