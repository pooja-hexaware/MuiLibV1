import React from 'react';
import {
  LocalizationProvider,
  TimePicker,
  DatePicker,
  DateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateTimePickerReact = (props: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {" "}
      {props.type == "date" ? (
        <DatePicker {...props} />
      ) : props.type == "time" ? (
        <TimePicker {...props} />
      ) : (
        <DateTimePicker {...props} />
      )}{" "}
    </LocalizationProvider>
  );
};
export default DateTimePickerReact;
