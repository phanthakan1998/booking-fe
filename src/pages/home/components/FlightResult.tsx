import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { FlightInformation } from "../../../interfaces/flight";
import { formatDateTime } from "src/utils/date";
import BookingModal from "./BookingModal";
import UseBooking from "../hooks/useBooking";
import BookingInformationModal from "./BookingInformationModal";

type FlightResultProps = {
  flights: FlightInformation[];
};

const FlightResult: React.FC<FlightResultProps> = ({ flights }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedFlight, setSelectedFlight] = useState<FlightInformation>();
  const [
    isBookingInformationModalVisible,
    setIsBookingInformationModalVisible,
  ] = useState(false);
  const showModal = (flight: FlightInformation) => {
    setSelectedFlight(flight);
    setIsModalVisible(true);
  };

  const showBookingModal = () => {
    setIsBookingInformationModalVisible(true);
  };

  const closeBookingModal = () => {
    setIsBookingInformationModalVisible(false);
  };
  const { setConfirmBookingId, bookingInformation } = UseBooking();

  useEffect(() => {
    if (bookingInformation) {
      showBookingModal();
    }
  }, [bookingInformation]);

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
      {flights.length === 0 ? (
        <p className="text-gray-700">No flights found.</p>
      ) : (
        flights.map((flight, index) => {
          return (
            <div key={index} className="border-b border-gray-200 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {flight.airline} ({flight.originShortName}){" "}
                    {flight.originFullName} to ({flight.destinationShortName}){" "}
                    {flight.destinationFullName}
                  </h4>

                  <p className="text-sm text-gray-600">
                    Departure: {formatDateTime(flight.departureDateTime)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Arrival: {formatDateTime(flight.arrivalDateTime)}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    ${flight.price.toFixed(2)}
                  </p>
                  <Button
                    type="primary"
                    className="mt-2"
                    onClick={() => showModal(flight)}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      )}
      <BookingModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedFlight={selectedFlight}
        setConfirmBookingId={setConfirmBookingId}
      ></BookingModal>
      <BookingInformationModal
        bookingDetails={bookingInformation}
        visible={isBookingInformationModalVisible}
        onClose={closeBookingModal}
      ></BookingInformationModal>
    </div>
  );
};

export default FlightResult;
