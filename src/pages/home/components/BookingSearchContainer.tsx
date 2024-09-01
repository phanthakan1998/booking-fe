import React from "react";
import { Form, Select, DatePicker, Button } from "antd";
import dayjs from "../../../core/dayjs";
import {
  DestinationList,
  FlightSearchFormValues,
  OriginList,
} from "../../../interfaces/flight";

const { Option } = Select;

type BookingSearchContainerProps = {
  origins: OriginList[];
  destinations: DestinationList[];
  onSearchFlight: (form: FlightSearchFormValues) => Promise<void>;
};

const BookingSearchContainer: React.FC<BookingSearchContainerProps> = ({
  onSearchFlight,
  destinations,
  origins,
}) => {
  const [form] = Form.useForm<FlightSearchFormValues>();

  const onFinish = (values: FlightSearchFormValues) => {
    onSearchFlight(values);
  };

  const disabledDepartureDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="flex flex-col lg:flex-row lg:items-center gap-4"
      >
        <div className="flex flex-col lg:flex-row gap-4 lg:flex-1">
          <Form.Item
            name="origin"
            label="Origin"
            rules={[{ required: true, message: "Origin is required" }]}
            className="flex-1"
          >
            <Select
              showSearch
              placeholder="Select origin"
              className="w-full"
              filterOption={(input, option) =>
                typeof option?.label === "string" &&
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            >
              {origins.map((origin) => (
                <Option key={origin.id} value={origin.id}>
                  {origin.shortName} - {origin.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="destination"
            label="Destination"
            rules={[{ required: true, message: "Destination is required" }]}
            className="flex-1"
          >
            <Select
              showSearch
              placeholder="Select destination"
              className="w-full"
              filterOption={(input, option) =>
                typeof option?.label === "string" &&
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            >
              {destinations.map((destination) => (
                <Option key={destination.id} value={destination.id}>
                  {destination.shortName} - {destination.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="departureDate"
            label="Departure Date"
            rules={[{ required: true, message: "Departure Date is required" }]}
            className="flex-1"
          >
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="Select departure date"
              className="w-full"
              disabledDate={disabledDepartureDate}
            />
          </Form.Item>
        </div>
        <div className="flex justify-center w-full lg:w-auto lg:justify-end">
          <Button type="primary" htmlType="submit" className="w-full lg:w-auto">
            Search Flights
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BookingSearchContainer;
