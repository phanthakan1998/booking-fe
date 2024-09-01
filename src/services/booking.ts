import axios from "../core/axios";
import {
  PaymentStatus,
  PaymentInput,
  CreatedBookingResponse,
  CreateBookingRequest,
  BookingInformation,
} from "src/interfaces/booking";
import { APIResponseType } from "../interfaces/base-response";

const PAYMENT_BASE_PATH = `/api/payment`;
const BOOKING_BASE_PATH = `/api/booking`;
const BOOKING_BY_ID_BASE_PATH = `/api/booking/`;

export const processPayment = async (
  data: PaymentInput
): Promise<APIResponseType<PaymentStatus>> => {
  try {
    const res = await axios.post<APIResponseType<PaymentStatus>>(
      PAYMENT_BASE_PATH,
      data
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createBooking = async (
  data: CreateBookingRequest
): Promise<APIResponseType<CreatedBookingResponse>> => {
  try {
    const res = await axios.post<APIResponseType<CreatedBookingResponse>>(
      BOOKING_BASE_PATH,
      data
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getBookingById = async (
  flightId: string
): Promise<APIResponseType<BookingInformation>> => {
  try {
    const path = BOOKING_BY_ID_BASE_PATH.concat(flightId);
    const res = await axios.get<APIResponseType<BookingInformation>>(path);

    return res.data;
  } catch (error) {
    throw error;
  }
};
