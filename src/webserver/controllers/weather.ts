import * as hapi from 'hapi';
import * as queryString from 'query-string';

interface IAddData {
  chatId: number;
  cityName: string;
}

type IRemoveData = IAddData;

export const addHandler = async (request: hapi.Request, reply: any) => {
  const data = queryString.parse(request.payload as string);
  const { chatId } = data;

  return {};
};

export const removeHandler = async (request: hapi.Request, reply: any) => {
  const data = queryString.parse(request.payload as string);
  const { chatId } = data;

  return {};
};
