import React, { Dispatch, SetStateAction } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  BookingFormData,
  CreateBookingRequest,
  PaymentInput,
} from "src/interfaces/booking";
import { encryptData } from "src/utils/security";
import { createBooking, processPayment } from "src/services/booking";
import dayjs from "../../../core/dayjs";
import { FlightInformation } from "src/interfaces/flight";

type BookingModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  selectedFlight: FlightInformation | undefined;
  setConfirmBookingId: Dispatch<SetStateAction<string>>;
};

const BookingModal: React.FC<BookingModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  selectedFlight,
  setConfirmBookingId,
}) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async (values: BookingFormData) => {
    if (!selectedFlight) return;

    const sensitiveData = {
      cardNumber: encryptData(values.cardNumber),
      cvv: encryptData(values.cvv),
      expirationDate: encryptData(values.expirationDate),
    };

    const paymentData: PaymentInput = {
      cardNumber: sensitiveData.cardNumber,
      cvv: sensitiveData.cvv,
      expiredDate: sensitiveData.expirationDate,
      price: Number(selectedFlight.price),
      bookingId: uuidv4(),
      cardName: values.cardName,
    };

    try {
      const processPaymentResponse = await processPayment(paymentData);
      if (!processPaymentResponse.isSuccess) {
        throw new Error("Payment processing failed");
      }

      const bookingData: CreateBookingRequest = {
        bookingId: paymentData.bookingId,
        paymentId: processPaymentResponse.data.id,
        price: Number(selectedFlight.price),
        flightId: selectedFlight.id,
        passengerName: values.firstName,
        passengerLastName: values.lastName,
        bookingDate: dayjs(new Date()).unix(),
      };

      const bookingResponse = await createBooking(bookingData);
      setConfirmBookingId(bookingResponse.data.bookingId);

      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Payment Processing Error",
        description:
          "There was an error processing your payment. Please try again later.",
      });
    }
  };

  const validateCardNumber = (rule: any, value: string) => {
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(value)) {
      return Promise.reject("Card number must be 16 digits.");
    }
    return Promise.resolve();
  };

  const validateCVV = (rule: any, value: string) => {
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!cvvRegex.test(value)) {
      return Promise.reject("CVV must be 3 or 4 digits.");
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title="Passenger and Payment Details"
      open={isModalVisible}
      centered={true}
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleOk}>
        <Form.Item
          label="Passenger First Name"
          name="firstName"
          rules={[{ required: true, message: "Please enter your first name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Passenger Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please enter your last name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Passenger Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Card Number"
          name="cardNumber"
          rules={[
            { required: true, message: "Please enter your card number" },
            { validator: validateCardNumber },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Card Name"
          name="cardName"
          rules={[{ required: true, message: "Please enter your card name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="CVV"
          name="cvv"
          rules={[
            { required: true, message: "Please enter your CVV" },
            { validator: validateCVV },
          ]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item
          label="Expiration Date"
          name="expirationDate"
          rules={[
            {
              required: true,
              message: "Please enter your card's expiration date",
            },
          ]}
        >
          <Input placeholder="MM/YYYY" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingModal;
