import Button from "./Button";
import { useRef, useState, useEffect } from "react";
export default function ImageUpload(props) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const pickImageRef = useRef();
  useEffect(
    (pre) => {
      if (!file) {
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };

      fileReader.readAsDataURL(file);
    },
    [file]
  );
  function handleChangeImage(e) {
    console.log(e.target.files);
    let fileIsValid = isValid;
    let pickedFile;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    console.log("inprops", fileIsValid);
    props.onInput(props.id, pickedFile, fileIsValid);
  }
  function handlePickImage(e) {
    pickImageRef.current.click();
  }
  return (
    <div className="form-control">
      <input
        type="file"
        id={props.id}
        ref={pickImageRef}
        style={{ display: "none" }}
        accept=".png,.jpeg,.jpg"
        onChange={(e) => handleChangeImage(e)}
      />
      <div className={`image-upload ${props.center && `center`}`}>
        <div className={`image-upload__preview`}>
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>Please pick a image</p>}
        </div>
        <Button type="button" onClick={(e) => handlePickImage(e)}>
          Pick image
        </Button>
        {!isValid && props.errorText}
      </div>
    </div>
  );
}
