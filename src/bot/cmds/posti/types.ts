export interface ITracking {
  shipments: IShipment[];
}

export interface IShipment {
  shipmentType: string;
  items: ITrackingItems;
  trackingCode: string;
  errandCode: null;
  waybillnumber: null;
  phase: string;
  estimatedDeliveryTime: string;
  pickupAddress: IPickupAddress;
  lastPickupDate: null;
  product: IProduct;
  extraServices: IProduct[];
  weight: string;
  height: string;
  width: string;
  depth: string;
  volume: string;
  packageQuantity: null;
  loadingMeters: null;
  destinationPostcode: string;
  destinationCity: string;
  destinationCountry: string;
  recipientSignature: null;
  codAmount: null;
  codCurrency: null;
  events: IEvent[];
  sender: null;
  lockerCode: null;
  destinationPostal: null;
  sourcePostal: null;
  flexProduct: boolean;
  estimateInPast: boolean;
  estimateInFarPast: boolean;
  phoneSender: boolean;
  phoneRecipient: boolean;
  recipientInfoSet: boolean;
  recipientPhoneSet: boolean;
  recipientPhoneRegistration: boolean;
  references: IReferences;
  adWidget: null;
}

export interface ITrackingItem {
  trackingNumbers: string[];
  packages: null;
  packageQuantity: null;
  grossWeight: null;
  netWeight: null;
  volume: null;
  loadingMeter: null;
  length: null;
  width: null;
  height: null;
  product: null;
  productName: null;
  services: null;
  events: null;
  phase: null;
}

export type ITrackingItems = ITrackingItem[];

export interface IEvent {
  description: IAdditionalInfo;
  reasonDescription: IAdditionalInfo;
  additionalInfo: IAdditionalInfo;
  timestamp: string;
  locationCode: null;
  locationName: string;
}

export interface IAdditionalInfo {
  fi: null | string;
  en: null | string;
  sv: null | string;
  et: null | string;
  lt: null | string;
  lv: null | string;
  ru: null;
}

export interface IProduct {
  code: string;
  name: IAdditionalInfo;
  additionalInfo: IAdditionalInfo;
}

export interface IPickupAddress {
  name: string;
  street: string;
  postcode: string;
  city: string;
  latitude: string;
  longitude: string;
  availability: string;
}

export interface IReferences {
  INVOICING_CODE: string;
}
