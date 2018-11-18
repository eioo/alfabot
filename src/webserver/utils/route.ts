import {
  Request,
  ResponseToolkit,
  RouteOptions,
  RouteOptionsValidate,
} from 'hapi';

type Handler = (request: Request, h: ResponseToolkit) => any;

const route = (
  method: string,
  path: string,
  handler: Handler,
  validator?: RouteOptionsValidate
) => {
  const options: RouteOptions = {
    cors: { origin: 'ignore' },
  };

  if (validator) {
    options.validate = validator;
  }

  return {
    options,
    method,
    path,
    handler,
  };
};

const GET = (
  path: string,
  handler: Handler,
  validator?: RouteOptionsValidate
) => route('GET', path, handler, validator);

const POST = (
  path: string,
  handler: Handler,
  validator?: RouteOptionsValidate
) => route('POST', path, handler, validator);

const DELETE = (
  path: string,
  handler: Handler,
  validator?: RouteOptionsValidate
) => route('DELETE', path, handler, validator);

export { route, GET, POST, DELETE };
