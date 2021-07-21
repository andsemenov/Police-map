import React from "react";
import { Popup } from "react-leaflet";
import regionalCenters from "../assets/data/data.json";

const PopupInformation = (props) => {
  const getFrequency = (array) => {
    const map = {};
    array.forEach((item) => {
      if (map[item.category]) {
        map[item.category]++;
      } else {
        map[item.category] = 1;
      }
    });
    return map;
  };
  let entries = Object.entries(getFrequency(props.dataCrimes));
  let topThreeCrimes = entries.sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <Popup position={props.position} onClose={props.closePopup}>
      {props.loading ? (
        <h1 id="test">Loading...</h1>
      ) : (
        <div className="popup">
          <h2 className="popup-content">
            {
              regionalCenters.find(
                (regionalCenter) =>
                  regionalCenter.Latitude === props.position[0] &&
                  regionalCenter.Longitude === props.position[1]
              ).location
            }
          </h2>
          <h5 className="popup-content">
            Month:{" "}
            {
              props.dataCrimes.length > 0
                ? props.dataCrimes[0].month
                : "n/a" /* props.selectedDate.slice(-7) */
            }
          </h5>
          <h3 className="popup-content">
            Total crimes: {props.dataCrimes.length}
          </h3>

          <div className="top-crimes">
            <h4>Top-3 crimes:</h4>
            {topThreeCrimes.map((topCrime, index) => (
              <p key={index} className="top-crime">
                - {topCrime[0]}: {topCrime[1]}
              </p>
            ))}
          </div>
        </div>
      )}
    </Popup>
  );
};

export default PopupInformation;
