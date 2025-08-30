import { useParams } from "react-router-dom";
import Input from "../../shared/Components/FormElements/Input";
import Button from "../../shared/Components/FormElements/Button";
import "./NewPlaces.css";
import { useForm } from "../../shared/Components/hooks/form-hook";
import Card from "../../shared/Components/UIElements/Card";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../validators";
import { useEffect, useState } from "react";
import { useHttpHook } from "../../shared/Components/hooks/http-hook";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../../shared/Components/Context/Auth-Context";
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
//     title: "Emp. state building",
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
export default function UpdatePlaces() {
  const placeId = useParams().placeId;
  const { loading, error, fetchApiCall, handlecancelOnError } = useHttpHook();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { userId, token } = useContext(Authcontext);
  const navigate = useNavigate();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  // const [loading, setLoading] = useState(true);
  // const identifiedPlace = dummy_places.find((place) => place.id === placeId);
  useEffect(() => {
    async function getData() {
      try {
        const responseData = await fetchApiCall(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlaces(responseData.data.place);
        setFormData(
          {
            title: {
              value: responseData.data.place.title,
              isValid: true,
            },
            description: {
              value: responseData.data.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    }
    getData();
  }, [fetchApiCall, placeId, setFormData]);

  console.log("formstate", formState);
  if (loading) {
    return (
      <div className="center">
        <Card>
          <h2>Loading...</h2>
        </Card>
      </div>
    );
  }
  if (!setLoadedPlaces && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find places</h2>
        </Card>
      </div>
    );
  }
  console.log("loading", loading);

  async function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = formState.inputs;
    try {
      await fetchApiCall(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify({
          title: title.value,
          description: description.value,
        })
      );
      navigate(`/${userId}/places`);
    } catch (err) {}
  }
  return (
    <>
      {error && <ErrorModal error={error} onClear={handlecancelOnError} />}
      {!loading && loadedPlaces && (
        <form className="place-form" onSubmit={(e) => handleSubmit(e)}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            value={formState.inputs.title.value}
            isValid={formState.inputs.title.isValid}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            value={formState.inputs.description.value}
            isValid={formState.inputs.description.isValid}
          />
          <Button
            type="submit"
            disabled={
              !(
                formState.inputs.title.isValid &&
                formState.inputs.description.isValid
              )
            }
          >
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
}
