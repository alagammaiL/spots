import "./Input.css";
import { useEffect, useReducer } from "react";
import { validate } from "../../../validators";
function inputReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
}
export default function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isValid: props.isValid || false,
    isTouched: false,
  });
  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    props.onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);
  function onChangeHandler(event) {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  }
  function touchHandler(event) {
    dispatch({ type: "TOUCH" });
  }
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChangeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={onChangeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}
