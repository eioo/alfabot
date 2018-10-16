import fetch from 'node-fetch';
import { ITracking } from './types';

const TRACKING_URL = 'https://www.posti.fi/henkiloasiakkaat/seuranta/api/shipments';

export const shipmentPhases = {
  WAITING: 'Lähetys ei ole vielä saapunut Postille',
  RECEIVED: 'Lähetys on vastaanotettu',
  IN_TRANSPORT: 'Lähetys on kuljetuksessa',
  READY_FOR_PICKUP: 'Lähetys on noudettavissa',
  DELIVERED: 'Lähetys on toimitettu',
  RETURNED_TO_SENDER: 'Lähetys on palautettu',
}

export async function getTrackingDetails(trackingCode: string, ...trackingCodes: string[]): Promise<ITracking> {
  const body = {
    trackingCodes: [trackingCode, ...trackingCodes],
  };

  const request = await fetch(TRACKING_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await request.json();
  return json;
}
