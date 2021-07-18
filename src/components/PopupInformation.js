import React from "react";
import { Popup } from "react-leaflet";
import regionalCenters from "../assets/data/data.json";

const PopupInformation = (props) => {
  return (
    <Popup position={props.position} onClose={props.closePopup}>
      {props.loading ? (
        <h1>Loading...</h1>
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
          <h2>Total crimes: {props.dataCrimes.length}</h2>
          <p>New cases (1 day*): {props.dataCrimes.New_Cases_Per_Day}</p>
          <p>
            Cases per 1 million people:
            {props.dataCrimes.Cases_Per_1_Million_People}
          </p>
          <p>Deaths: {props.dataCrimes.Deaths}</p>
        </div>
      )}
    </Popup>
  );
};

export default PopupInformation;
