import PlaceList from "../Components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpHook } from "../../shared/Components/hooks/http-hook";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import { useNavigate } from "react-router-dom";
// let dummy_places = [
//   {
//     id: "p1",
//     title: "Empire state building",
//     description: "One of the most famous sky scraper in the world",
//     imageUrl:
//       "https://media.architecturaldigest.com/photos/66b397865c4b67e0f3a7d9ac/16:9/w_1920,c_limit/GettyImages-584714362.jpg",
//     address: "20 W 34th St., New York, NY 10001, United States",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9882393,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Empire state building",
//     description: "One of the most famous sky scraper in the world",
//     imageUrl:
//       "https://media.architecturaldigest.com/photos/66b397865c4b67e0f3a7d9ac/16:9/w_1920,c_limit/GettyImages-584714362.jpg",
//     address: "20 W 34th St., New York, NY 10001, United States",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9882393,
//     },
//     creator: "u2",
//   },
// ];
// let dummy_places = [];
export default function UserPlaces() {
  const userId = useParams().userId;
  const navigate = useNavigate();
  const [dummy_places, setDummmyPlaces] = useState([]);
  console.log(userId);
  const { loading, error, fetchApiCall, handlecancelOnError } = useHttpHook();
  useEffect(() => {
    async function fetchData() {
      try {
        const responseData = await fetchApiCall(
          `${process.env.REACT_APP_BACKEND_URL}/places/users/${userId}`
        );
        setDummmyPlaces(responseData.data.place);
      } catch (err) {
        // navigate("/");
      }
    }
    fetchData();
  }, [fetchApiCall, userId]);

  function placeDeletedHandler(deletedPlaceId) {
    console.log("hello in userplces entering");
    setDummmyPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place._id !== deletedPlaceId)
    );
  }
  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <ErrorModal error={error} onClear={handlecancelOnError} />}
      {!loading && dummy_places.length > 0 && (
        <PlaceList items={dummy_places} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
}
