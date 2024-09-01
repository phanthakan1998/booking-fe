import { useEffect, useState } from "react";

import { notification } from "antd";
import { getBookingById } from "src/services/booking";
import { BookingInformation } from "src/interfaces/booking";

const UseBooking = () => {
  const [confirmBookingId, setConfirmBookingId] = useState<string>("");
  const [bookingInformation, setBookingInformation] =
    useState<BookingInformation>();

  const getBookingInformation = async (bookingId: string) => {
    try {
      if (bookingId === "") return;

      const result = await getBookingById(bookingId);
      setBookingInformation(result.data);
      return result;
    } catch (error) {
      notification.error({
        message: "Payment Processing Error",
        description:
          "There was an error processing your payment. Please try again later.",
      });
    }
  };

  useEffect(() => {
    getBookingInformation(confirmBookingId);
  }, [confirmBookingId]);

  return {
    setConfirmBookingId,
    bookingInformation,
  };
};

export default UseBooking;
