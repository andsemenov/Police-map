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
        <div>
          <h1>
            {
              regionalCenters.find(
                (regionalCenter) =>
                  regionalCenter.Latitude === props.position[0] &&
                  regionalCenter.Longitude === props.position[1]
              ).location
            }
          </h1>
          <h3>Total crimes: {props.dataCrimes.length}</h3>
          <p>
            Month:{" "}
            {props.dataCrimes.length > 0 ? props.dataCrimes[0].month : "n/a"}
          </p>
          <div>
            Top-3 crimes:
            {topThreeCrimes.map((topCrime, index) => (
              <p key={index}>
                {topCrime[0]}: {topCrime[1]}
              </p>
            ))}
          </div>
        </div>
      )}
    </Popup>
  );
};

export default PopupInformation;
