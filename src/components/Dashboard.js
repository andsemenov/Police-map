import { React, useState, useEffect } from "react";

function Dashboard(props) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    async function fetchAvailableDate() {
      try {
        const resp = await fetch(
          "https://data.police.uk/api/crime-last-updated"
        );
        if (resp.status >= 200 && resp.status <= 299) {
          const json = await resp.json();
          setAvailableDate(json.date.slice(0, 7));
          setCurrentDate(json.date.slice(0, 7));
        } else {
          throw new Error(resp.statusText);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchAvailableDate();
  }, []);

  useEffect(() => {
    const validDate = (date1, date2) => {
      return new Date(date1).getTime() <= new Date(date2).getTime();
    };
    props.setSelectedDate(`&date=${availableDate}`);
    if (month !== "" && year !== "") {
      if (validDate(`${year}-${month}`, availableDate)) {
        props.setSelectedDate(`&date=${year}-${month}`);
        setCurrentDate(`${year}-${month}`);
      } else {
        alert("Please select a date before last updated");
      }
    }
  }, [month, year, props, availableDate]);

  return (
    <div className="header">
      <h1>
        Street-level crimes during {currentDate} (last updated {availableDate})
      </h1>
      <div className="selects">
        <select
          name="select-year"
          onClick={(e) => {
            setYear(e.target.value);
          }}
        >
          <option value="">Choose a Year</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>
        <select
          name="select-month"
          onClick={(e) => {
            setMonth(e.target.value);
          }}
        >
          <option value="">Choose a Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
    </div>
  );
}

export default Dashboard;
