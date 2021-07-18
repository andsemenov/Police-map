import { React, useEffect, useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import regionalCenters from "../src/assets/data/data.json";
import icon1 from "../src/assets/images/map_pin_blue5.svg";

const crimeIcon = new Icon({
  iconUrl: icon1,
  iconSize: [25, 25],
});

function App() {
  const [dataCrimes, setDataCrimes] = useState(null);
  const [currentCoordinates, setCurrentCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  async function fetchData(lat, lon) {
    try {
      const resp = await fetch(
        `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lon}`
      );

      if (resp.status >= 200 && resp.status <= 299) {
        const json = await resp.json();
        setDataCrimes([...json]);
        setLoading(false);
      } else {
        setLoading(false);
        setIsError(true);

        throw new Error(resp.statusText);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <MapContainer center={[55, -2]} zoom={6} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {regionalCenters.map((eachData) => (
        <Marker
          key={eachData.Id}
          position={[eachData.Latitude, eachData.Longitude]}
          eventHandlers={{
            click: () => {
              setCurrentCoordinates([
                ...currentCoordinates,
                eachData.Latitude,
                eachData.Longitude,
              ]);
              fetchData(eachData.Latitude, eachData.Longitude);
            },
          }}
          icon={crimeIcon}
        />
      ))}

      {currentCoordinates.length !== 0 && dataCrimes && (
        <Popup
          position={currentCoordinates}
          onClose={() => {
            setDataCrimes(null);
            setCurrentCoordinates([]);
            setLoading(true);
          }}
        >
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <h1>{dataCrimes.length}</h1>
              <p>Total cases: {dataCrimes.Total_Cases}</p>
              <p>New cases (1 day*): {dataCrimes.New_Cases_Per_Day}</p>
              <p>
                Cases per 1 million people:{" "}
                {dataCrimes.Cases_Per_1_Million_People}
              </p>
              <p>Deaths: {dataCrimes.Deaths}</p>
            </div>
          )}
        </Popup>
      )}
    </MapContainer>
  );
}

export default App;
