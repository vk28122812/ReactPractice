import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { updateUserPlaces, fetchUserPlaces } from "./http.js";
import Error from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();
  const [isFetching, setIsFetching] = useState(false);
  const [errorUpdating, setErrorUpdating] = useState();
  const [errorFetching, setErrorFetching] = useState();
  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);



  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
        setIsFetching(false);
      } catch (error) {
        setErrorFetching({ message: error.message || "Failed to fetch user-places" });
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdating({
        message: error.message || "Error in updating places"
      });
    }
  }

  function handleError() {
    setErrorUpdating(undefined);
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );
      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdating({
          message: error.message || "Error in deleting place"
        });
      }
      setModalIsOpen(false);
    },
    [userPlaces]
  );

  console.log(errorUpdating);
  return (
    <>
      <Modal open={errorUpdating} onClose={handleError}>
        {errorUpdating && (
          <Error
            title={"An error occurred"}
            message={errorUpdating.message}
            onConfirm={handleError}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {errorFetching && <Error title={"an error occurred"} message={errorFetching.message} />}
        {!errorFetching && 
          <Places
            title="I'd like to visit ..."
            isLoading={isFetching}
            loadingText={"fetching your places"}
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        }
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
