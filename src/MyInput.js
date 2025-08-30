export default function MyInput({
  name,
  type,
  label,
  element,
  hasError,
  errorMsg,
  ...props
}) {
  if (element === "input") {
    console.log("helloo in text");
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input type={type} name={name} {...props} />
        {hasError && <p>{errorMsg}</p>}
      </div>
    );
  } else {
    console.log("helloo in textarea");
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <textarea name={name} rows={props.rows} {...props} />
        {hasError && <p>{errorMsg}</p>}
      </div>
    );
  }
}
