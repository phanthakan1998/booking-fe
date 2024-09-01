import { useEffect, useState } from "react";
import {
  DestinationList,
  FlightInformation,
  FlightSearchFormValues,
  OriginList,
  SearchFlightInput,
} from "../../../interfaces/flight";
import {
  getDestination,
  getOrigin,
  getSearchFlight,
} from "../../../services/flight";
import dayjs from "../../../core/dayjs";

const UseFlight = () => {
  const [flights, setFlights] = useState<FlightInformation[]>([]);
  const [origins, setOrigins] = useState<OriginList[]>([]);
  const [destinations, setDestinations] = useState<DestinationList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSearchFlight = async (form: FlightSearchFormValues) => {
    const { origin, destination, departureDate } = form;

    const body: SearchFlightInput = {
      originId: origin,
      destinationId: destination,
      startDate: dayjs.utc(departureDate).startOf("day").unix(),
    };

    setIsLoading(true);
    try {
      const response = await getSearchFlight(body);
      setFlights(response.data);
    } catch (err) {
      setFlights([]);
      //TODO handle Error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrigins = async () => {
      setIsLoading(true);
      try {
        const originResponse = await getOrigin();
        const destinationResponse = await getDestination();

        setOrigins(originResponse.data);
        setDestinations(destinationResponse.data);
      } catch (err) {
        setOrigins([]);
        setDestinations([]);
        //TODO handle Error
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrigins();
  }, []);
  return {
    flights,
    setFlights,
    isModalVisible,
    setIsModalVisible,
    origins,
    destinations,
    onSearchFlight,
    isLoading,
  };
};

export default UseFlight;
