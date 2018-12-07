import React from 'react';
import { connect } from 'formik';

import Dropzone from "react-dropzone";
import Thumb from "./Thumb";

const dropzoneStyle = {
  maxWidth: "300px",
  marginLeft: "auto",
  marginRight: "auto",
  height: "auto",
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
}

export const CustomDropzone = ({ formik, name, validate }) => {
  const { values, setFieldValue, setFieldError } = formik;
  const file = values[name];

  const handleDrop = files => {
    if (files.length === 0) return;
    if(!validate) return setFieldValue(name, files[0]);
    const error = validate(files[0]);
    return error ? 
      setFieldError(name, error) :
      setFieldValue(name, files[0]);
  }

  const preview = file ?
    <Thumb file={file} /> :
    <p className="m-1">Drag your image here!</p>

  return (
    <Dropzone style={dropzoneStyle} onDrop={handleDrop}>
      {preview}
    </Dropzone>
  )
}


export default connect(CustomDropzone);

