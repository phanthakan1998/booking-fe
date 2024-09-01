export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  cardNumber: string;
  cardName: string;
  cvv: string;
  expirationDate: string;
}

export interface PaymentInput {
  cvv: string;
  cardName: string;
  price: number;
  cardNumber: string;
  expiredDate: string;
  bookingId: string;
}

export interface PaymentStatus {
  id: string;
  bookingId: string;
  status: string;
}

export interface CreateBookingRequest {
  bookingId: string;
  paymentId: string;
  price: number;
  flightId: string;
  passengerName: string;
  passengerLastName: string;
  bookingDate: Date | string | number;
  passengerId?: string;
}

export interface CreatedBookingResponse {
  bookingId: string;
  status: string;
}

export interface BookingInformation {
  bookingId: string;
  status: string;
  departureDateTime: Date | string | number;
  arrivalDateTime: Date | string | number;
  originFullName: string;
  originShortName: string;
  destinationFullName: string;
  destinationShortName: string;
  airline: string;
  bookingDate: Date | string | number;
}
