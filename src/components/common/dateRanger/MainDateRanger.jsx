import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useMemo } from "react";

dayjs.extend(customParseFormat);

/* Date format */
const dateFormat = "YYYY-M-D";

function MainDateRanger({ onChange, isDisabled }) {
  /* Memo */
  const currentDate = useMemo(() => {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    let year = dateObj.getUTCFullYear();

    return year + "-" + month + "-" + day;
  }, []);

  return (
    <div style={{ marginBottom: "2rem", textAlign: "center" }}>
      <DatePicker.RangePicker
        defaultValue={[
          dayjs(currentDate, dateFormat),
          dayjs(currentDate, dateFormat),
        ]}
        onChange={(_, val) => onChange(val)}
        disabled={isDisabled}
      />
    </div>
  );
}

export default MainDateRanger;
