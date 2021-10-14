import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import regionalCenters from "../assets/data/data.json";
import icon1 from "../assets/images/map_pin_blue5.svg";
import PopupInformation from "./PopupInformation";

const crimeIcon = new Icon({
  iconUrl: icon1,
  iconSize: [25, 25],
});

function MapPackage(props) {
  const [dataCrimes, setDataCrimes] = useState(null);
  const [currentCoordinates, setCurrentCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    if (currentCoordinates.length === 2)
      fetchData(
        currentCoordinates[0],
        currentCoordinates[1],
        props.selectedDate
      );
  }, [props.selectedDate, currentCoordinates]);

  async function fetchData(lat, lon, date) {
    try {
      const resp = await fetch(
        `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lon}${date}`
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
  console.log(currentCoordinates);
  return (
    <MapContainer center={[54.5, -3]} zoom={5.5} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {regionalCenters.map((eachData) => (
        <Marker
          key={eachData.id}
          position={[eachData.Latitude, eachData.Longitude]}
          eventHandlers={{
            click: () => {
              fetchData(
                eachData.Latitude,
                eachData.Longitude,
                props.selectedDate
              );
              setCurrentCoordinates([eachData.Latitude, eachData.Longitude]);
            },
          }}
          icon={crimeIcon}
        />
      ))}

      {currentCoordinates.length && dataCrimes && (
        <PopupInformation
          position={currentCoordinates}
          isLoading={loading}
          selectedDate={props.selectedDate}
          closePopup={() => {
            setDataCrimes(null);
            setCurrentCoordinates([]);
            setLoading(true);
          }}
          dataCrimes={dataCrimes}
        />
      )}
    </MapContainer>
  );
}

export default MapPackage;
