import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  // useEffect( ()=>{
  //   fetch('http://localhost:3000/places').then((response)=>{
  //     return response.json();
  //   }).then( (resData) => {
  //     setAvailablePlaces(resData.places)
  //   })
  // },[])


  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {

        const places = await fetchAvailablePlaces();    
        navigator.geolocation.getCurrentPosition( (position)=>{
          const sortedPlaces = sortPlacesByDistance(places,position.coords.latitude, position.coords.longitude );
          setAvailablePlaces(sortedPlaces);
        })
        setIsFetching(false);
      } catch (error) {
        setError({
          message: error.message || "Could not fetch places, try later",
        });
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error message={error.message} title="An error occurred" />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Hang On!!! still loading !!!"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
