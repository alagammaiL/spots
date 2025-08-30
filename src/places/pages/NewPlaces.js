import React, { useCallback, useReducer } from "react";

import Input from "../../shared/Components/FormElements/Input";
import Button from "../../shared/Components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../src/validators";
import "./NewPlaces.css";
import ImageUpload from "../../shared/Components/FormElements/ImageUpload";
import { useForm } from "../../shared/Components/hooks/form-hook";
import { useHttpHook } from "../../shared/Components/hooks/http-hook";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../../shared/Components/Context/Auth-Context";
const NewPlaces = () => {
  const { loading, error, fetchApiCall, handlecancelOnError } = useHttpHook();
  const { userId, token } = useContext(Authcontext);
  const navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  async function submitHandler(event) {
    event.preventDefault();
    console.log(formState.inputs);
    const { address, description, title, image } = formState.inputs;
    try {
      const formdata = new FormData();
      formdata.append("title", title.value);
      formdata.append("description", description.value);
      formdata.append("address", address.value);
      formdata.append("imageUrl", image.value);
      formdata.append("creator", userId);
      await fetchApiCall(
        `${process.env.REACT_APP_BACKEND_URL}/places`,
        "POST",
        {
          Authorization: `Bearer ${token}`,
        },
        formdata
      );
      navigate("/");
    } catch (err) {}
  }
  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <ErrorModal error={error} onClear={handlecancelOnError} />}
      <form className="place-form">
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="text"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE(5)]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button
          type="submit"
          disabled={!formState.isValid}
          onClick={(event) => submitHandler(event)}
        >
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlaces;
