import { AxiosRequestConfig } from "axios";
import axios from "../core/axios";
import qs from "qs";
import {
  OriginList,
  DestinationList,
  FlightInformation,
  SearchFlightInput,
} from "src/interfaces/flight";
import { APIResponseType } from "../interfaces/base-response";

const ORIGIN_BASE_PATH = `/api/origins`;
const DESTINATION_BASE_PATH = `/api/destinations`;
const SEARCH_FLIGHT_BASE_PATH = `/api/searchFlight`;

export const getOrigin = async (): Promise<APIResponseType<OriginList[]>> => {
  try {
    const res = await axios.get<APIResponseType<OriginList[]>>(
      ORIGIN_BASE_PATH
    );

    const data: OriginList[] = res.data.data.map((item) => ({
      ...item,
    }));

    return {
      ...res.data,
      data,
    };
  } catch (error) {
    throw error;
  }
};

export const getDestination = async (): Promise<
  APIResponseType<DestinationList[]>
> => {
  try {
    const res = await axios.get<APIResponseType<DestinationList[]>>(
      DESTINATION_BASE_PATH
    );

    const data: OriginList[] = res.data.data.map((item) => ({
      ...item,
    }));

    return {
      ...res.data,
      data,
    };
  } catch (error) {
    throw error;
  }
};
export const getSearchFlight = async (
  body: SearchFlightInput
): Promise<APIResponseType<FlightInformation[]>> => {
  try {
    const config: AxiosRequestConfig = {
      params: body,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
    };

    const res = await axios.get<APIResponseType<FlightInformation[]>>(
      SEARCH_FLIGHT_BASE_PATH,
      config
    );

    const data: FlightInformation[] = res.data.data.map((item) => ({
      ...item,
    }));

    return {
      ...res.data,
      data,
    };
  } catch (error) {
    throw error;
  }
};
