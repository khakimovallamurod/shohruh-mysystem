import { SwapRightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styles from "./mainRangeDatePicker.module.css";

function MainRangeDatePicker({ setValue = () => {}, value }) {
  /* State */
  const [date, setDate] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    if (value && value.start && value.end) {
      setDate({ ...value });
    } else {
      let today = new Date();
      let tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      // Format the dates as "YYYY-MM-DD" for input[type=date]
      let todayFormatted = today.toISOString().split("T")[0];
      let tomorrowFormatted = tomorrow.toISOString().split("T")[0];

      // const d = new Date();
      // const month = d.getMonth() + 1;
      // const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
      // const nextDay =
      //   d.getDate() < 10 ? `0${d.getDate() + 1}` : d.getDate() + 1;
      // const year = d.getFullYear();

      const newDate = {
        start: todayFormatted,
        end: tomorrowFormatted,
      };
      setDate({ ...newDate });
      setValue({ ...newDate });
    }
  }, [setValue, value]);

  const handleChangeData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newDate = { ...date };
    newDate[name] = value;

    setValue({ ...newDate });
    setDate({ ...newDate });
  };

  return (
    <div className={styles.body}>
      <input
        name="start"
        type="date"
        onChange={handleChangeData}
        value={date.start}
      />
      <SwapRightOutlined />
      <input
        name="end"
        type="date"
        onChange={handleChangeData}
        value={date.end}
      />
    </div>
  );
}

export default MainRangeDatePicker;
