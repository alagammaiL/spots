import { useState } from "react";
export function useForm(initialValueState, validationfN) {
  const [field, setfieldValue] = useState(initialValueState);
  const [hadEdit, setEdit] = useState(false);
  // console.log(hadEdit, validationfN());
  const valid = hadEdit && validationfN(field);
  console.log("valid", valid);
  function handleChange(value, identifier) {
    setfieldValue((pre) => {
      return value;
    });
    setEdit((pre) => {
      return false;
    });
  }
  function handleBlur() {
    setEdit((pre) => {
      return true;
    });
  }
  return {
    field,
    setfieldValue,
    valid,
    handleChange,
    handleBlur,
  };
}
