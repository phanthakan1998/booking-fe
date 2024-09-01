export interface FlightInformation {
  origin: string;
  destination: string;
  departureDate: number;
  arrivalDate: number;
  price: number;
}

export interface FlightSearchFormValues {
  origin: string;
  destination: string;
  departureDate: Date | string | number;
}

export interface OriginList {
  id: string;
  fullName: string;
  shortName: string;
}

export interface DestinationList {
  id: string;
  fullName: string;
  shortName: string;
}

export interface FlightInformation {
  id: string;
  originId: string;
  destinationId: string;
  departureDateTime: Date | string | number;
  arrivalDateTime: Date | string | number;
  originFullName: string;
  originShortName: string;
  destinationFullName: string;
  destinationShortName: string;
  airline: string;
  status: string;
  price: number;
}

export interface SearchFlightInput {
  originId: string;
  destinationId: string;
  startDate: Date | string | number;
}
