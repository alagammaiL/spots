import { useState } from "react";
import MyInput from "./MyInput";
import {
  requireFunction,
  nameFunction,
  passwordFunction,
  addressFunction,
} from "./validation";
import { useForm } from "./useForm";
export default function NewForm() {
  const {
    field: name,

    valid: nameValid,
    handleChange: handleNameChange,
    handleBlur: handleNameBlur,
  } = useForm("", (field) => {
    const value = requireFunction(field) && nameFunction(field);
    console.log("valiee", value);
    return !value;
  });
  const {
    field: password,

    valid: passwordValid,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
  } = useForm("", (field) => {
    const value = requireFunction(field) && passwordFunction(field);
    console.log("valiee", value);
    return !value;
  });
  const {
    field: address,

    valid: addressValid,
    handleChange: handleAddressChange,
    handleBlur: handleAddressBlur,
  } = useForm("", (field) => {
    const value = requireFunction(field) && addressFunction(field);
    console.log("valiee", value);
    return !value;
  });
  // const [userData, setUserData] = useState({
  //   name: "",
  //   password: "",
  //   address: "",
  // });
  // const [hadEdit, setEdit] = useState({
  //   name: false,
  //   password: false,
  //   address: false,
  // });

  // const nameValid =
  //   hadEdit.name &&
  //   !(requireFunction(userData.name) && nameFunction(userData.name));
  // const passwordValid =
  //   hadEdit.password &&
  //   !(
  //     requireFunction(userData.password) && passwordFunction(userData.password)
  //   );
  // const addressValid =
  //   hadEdit.address &&
  //   !(requireFunction(userData.address) && addressFunction(userData.address));

  // function handleChange(value, identifier) {
  //   setUserData((pre) => {
  //     return {
  //       ...pre,
  //       [identifier]: value,
  //     };
  //   });
  //   setEdit((pre) => {
  //     return {
  //       ...pre,
  //       [identifier]: false,
  //     };
  //   });
  // }
  // function handleBlur(identifier) {
  //   setEdit((pre) => {
  //     return {
  //       ...pre,
  //       [identifier]: true,
  //     };
  //   });
  // }
  return (
    <form>
      <MyInput
        name="name"
        element="input"
        type="text"
        value={name}
        label="enter your name"
        onChange={(e) => handleNameChange(e.target.value)}
        onBlur={() => handleNameBlur()}
        hasError={nameValid}
        errorMsg="please enter valid name"
      />

      <MyInput
        name="password"
        value={password}
        element="input"
        type="password"
        label="enter your password"
        onChange={(e) => handlePasswordChange(e.target.value)}
        onBlur={() => handlePasswordBlur()}
        hasError={passwordValid}
        errorMsg="please enter valid password"
      />
      <MyInput
        name="address"
        value={address}
        element="textarea"
        label="enter address"
        rows={3}
        onChange={(e) => handleAddressChange(e.target.value)}
        onBlur={() => handleAddressBlur()}
        hasError={addressValid}
        errorMsg="please enter valid address"
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          if (!nameValid && !passwordValid && !addressValid) {
            console.log("hlello");
          }
        }}
      >
        submit
      </button>
    </form>
  );
}
