import { useForm } from "../../shared/Components/hooks/form-hook";
import Input from "../../shared/Components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../validators";
import Card from "../../shared/Components/UIElements/Card";
import Button from "../../shared/Components/FormElements/Button";
import "./Authentication.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../../shared/Components/Context/Auth-Context";
import { useContext } from "react";
import ImageUpload from "../../shared/Components/FormElements/ImageUpload";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import { useHttpHook } from "../../shared/Components/hooks/http-hook";
export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, userId } = useContext(Authcontext);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loading, error, fetchApiCall, handlecancelOnError } = useHttpHook();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formState);
    const { name, email, password, image } = formState.inputs;

    if (isLogin) {
      try {
        const responseData = await fetchApiCall(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          {
            "content-type": "application/json",
          },
          JSON.stringify({
            email: email.value,
            password: password.value,
          })
        );

        login(responseData.data.user._id, responseData.token);
        navigate("/");
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("email", email.value);
        formData.append("password", password.value);
        formData.append("image", image.value);
        const responseData = await fetchApiCall(
          `${process.env.REACT_APP_BACKEND_URL}/users/signUp`,
          "POST",
          {},
          formData
        );

        login(responseData.data.user._id, responseData.data.token);
        navigate("/");
      } catch (err) {}
    }
  }
  function switchModeHandler(e) {
    e.preventDefault();
    if (!isLogin) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((pre) => !pre);
  }
  // function handlecancelOnError() {
  //   setError(null);
  // }
  return (
    <>
      {error && <ErrorModal error={error} onClear={handlecancelOnError} />}
      <Card className="authentication">
        {loading && <LoadingSpinner />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={(e) => handleSubmit(e)}>
          {!isLogin && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Enter Your Name"
              // value={formState.inputs.email.value}
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter a valid name."
              onInput={inputHandler}
              // isValid={formState.inputs.title.isValid}
            />
          )}
          {!isLogin && (
            <ImageUpload
              onInput={inputHandler}
              center
              id="image"
              errorText="Please provide an image"
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Enter Your mail Id"
            // value={formState.inputs.email.value}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid emailId."
            onInput={inputHandler}
            // isValid={formState.inputs.title.isValid}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Enter Your password"
            // value={formState.inputs.password.value}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Password incorrect."
            onInput={inputHandler}
            // isValid={formState.inputs.title.isValid}
          />
          <Button disabled={!formState.isValid} type="submit">
            {isLogin ? `LOGIN` : `SIGNUP`}
          </Button>
          <Button inverse onClick={(e) => switchModeHandler(e)} type="button">
            SWITCH TO {isLogin ? "SIGN UP" : "LOGIN"}
          </Button>
        </form>
      </Card>
    </>
  );
}
