/**
 * use this function for input validation
 */

type Value = {
  required: string;
  maxSize: { value: string | number; message: string };
  length: { value: string | number; message: string };
  minLength: { value: string | number; message: string };
  maxLength: { value: string | number; message: string };
  min: { value: string | number; message: string };
  max: { value: string | number; message: string };
};

function validator(validate: Value, value: string | number | object) {
  let errorMessage = "";
  if ("required" in validate) {
    if (!value || value === "") errorMessage = validate["required"];
  }

  if ("minLength" in validate) {
    if (
      value &&
      typeof value === "string" &&
      value.length < validate.minLength.value
    )
      errorMessage = validate["minLength"].message;
  }

  if ("maxLength" in validate) {
    if (
      value &&
      typeof value === "string" &&
      value.length > validate.maxLength.value
    )
      errorMessage = validate["maxLength"].message;
  }

  if ("length" in validate) {
    if (
      value &&
      typeof value === "string" &&
      String(value.length) > validate.length.value
    )
      errorMessage = validate["max"].message;
  }

  if ("maxSize" in validate) {
    // validate for blob file
    if ("size" in value) {
      if (value && value > validate.maxSize.value)
        errorMessage =
          validate["maxSize"].message +
          " " +
          `. This file is ${Math.ceil(Number(value.size) / 1024)}Kb`;
    }
  }

  if ("min" in validate) {
    if (value && value < validate.min.value)
      errorMessage = validate["min"].message;
  }
  if ("max" in validate) {
    if (value && value > validate.max.value)
      errorMessage = validate["max"].message;
  }

  return errorMessage;
}

export default validator;
