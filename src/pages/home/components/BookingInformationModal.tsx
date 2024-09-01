import React from "react";
import { Modal, Button, Row, Col, Typography } from "antd";
import dayjs from "../../../core/dayjs";
import { BookingInformation } from "src/interfaces/booking";

const { Text, Title } = Typography;

interface BookingInformationModalProps {
  visible: boolean;
  onClose: () => void;
  bookingDetails?: BookingInformation;
}

const BookingInformationModal: React.FC<BookingInformationModalProps> = ({
  visible,
  onClose,
  bookingDetails,
}) => {
  if (!bookingDetails) {
    return null;
  }

  const formatDate = (timestamp: number) =>
    dayjs.unix(timestamp).format("YYYY-MM-DD HH:mm");

  return (
    <Modal
      title="Booking Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div style={{ padding: "16px" }}>
        <Title level={4}>Booking Information</Title>
        <Row gutter={[16, 8]}>
          <Col span={8}>
            <Text strong>Booking ID:</Text>
          </Col>
          <Col span={16}>
            <Text>{bookingDetails.bookingId}</Text>
          </Col>

          <Col span={8}>
            <Text strong>Status:</Text>
          </Col>
          <Col span={16}>
            <Text>{bookingDetails.status}</Text>
          </Col>

          <Col span={8}>
            <Text strong>Departure:</Text>
          </Col>
          <Col span={16}>
            <Text>{`${bookingDetails.originFullName} (${bookingDetails.originShortName})`}</Text>
          </Col>

          <Col span={8}>
            <Text strong>Departure Time:</Text>
          </Col>
          <Col span={16}>
            <Text>{formatDate(Number(bookingDetails.departureDateTime))}</Text>
          </Col>

          <Col span={8}>
            <Text strong>Arrival:</Text>
          </Col>
          <Col span={16}>
            <Text>{`${bookingDetails.destinationFullName} (${bookingDetails.destinationShortName})`}</Text>
          </Col>

          <Col span={8}>
            <Text strong>Arrival Time:</Text>
          </Col>
          <Col span={16}>
            <Text>{formatDate(Number(bookingDetails.arrivalDateTime))}</Text>
          </Col>

          <Col span={8}>
            <Text strong>Airline:</Text>
          </Col>
          <Col span={16}>
            <Text>{bookingDetails.airline}</Text>
          </Col>

          <Col span={8}>
            <Text strong>Booking Date:</Text>
          </Col>
          <Col span={16}>
            <Text>{formatDate(Number(bookingDetails.bookingDate))}</Text>
          </Col>
        </Row>
        <div style={{ textAlign: "right", marginTop: "16px" }}>
          <Button type="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingInformationModal;
