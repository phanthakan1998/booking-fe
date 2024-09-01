import React from "react";
import "antd/dist/reset.css";
import FlightResult from "./components/FlightResult";
import BookingSearchContainer from "./components/BookingSearchContainer";
import useFlight from "./hooks/useFlight";
import { Row, Col, Spin } from "antd";

const BookingHome: React.FC = () => {
  const { flights, origins, destinations, onSearchFlight, isLoading } =
    useFlight();
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col span={24}>
        <BookingSearchContainer
          origins={origins}
          destinations={destinations}
          onSearchFlight={onSearchFlight}
        />
      </Col>
      <Col span={24}>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin size="large" tip="Loading flights..." />
          </div>
        ) : (
          <FlightResult flights={flights} />
        )}
      </Col>
    </Row>
  );
};

export default BookingHome;
