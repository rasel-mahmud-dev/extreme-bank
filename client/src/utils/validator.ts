/**
 * use this function for input validation
 */

type Value = {
  required: string;
  number: string;
  maxSize: { value: string | number; message: string };
  length: { value: string | number; message: string };
  minLength: { value: string | number; message: string };
  maxLength: { value: string | number; message: string };
  min: { value: string | number; message: string };
  max: { value: string | number; message: string };
};

function validator(validate: Value, value: string | number | object) {
  if ("required" in validate) {
    if (!value || value === "") return validate["required"];
  }

  if ("number" in validate) {
    if (isNaN(Number(value))) return validate["number"];
  }

  if ("minLength" in validate) {
    if (
      value &&
      typeof value === "string" &&
      value.length < validate.minLength.value
    )
      return validate["minLength"].message;
  }

  if ("maxLength" in validate) {
    if (
      value &&
      typeof value === "string" &&
      value.length > validate.maxLength.value
    )
      return validate["maxLength"].message;
  }

  if ("length" in validate) {
    if (
      value &&
      typeof value === "string" &&
      value.length !== validate.length.value
    )
      return validate["max"].message;
  }

  if ("maxSize" in validate) {
    // validate for blob file
    if ("size" in value) {
      if (value && value > validate.maxSize.value) {
        return (
          validate["maxSize"].message +
          " " +
          `. This file is ${Math.ceil(Number(value.size) / 1024)}Kb`
        );
      }
    }
  }

  if ("min" in validate) {
    if (value && value < validate.min.value) return validate["min"].message;
  }
  if ("max" in validate) {
    if (value && value > validate.max.value) return validate["max"].message;
  }
}

export default validator;
