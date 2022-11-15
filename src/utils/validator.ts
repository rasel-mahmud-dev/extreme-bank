/**
 * use this function for input validation
 * @param validate  it can be must object. this object have  required, minLength properties and value should be either string or object that has message and value field
 * @param value it can be string that is input field value
 * @returns {string}
 */

function validator(validate: any, value: string | number){
	let errorMessage = ""
	if("required" in validate){
		if(!value || value === "") errorMessage = validate["required"]
	}
	if ("maxSize" in validate){
		if (value && (value.size > validate.maxSize.value)) errorMessage = validate["maxSize"].message + " " + `. This file is ${Math.ceil(value.size / 1024)}Kb`
	}
	
	return errorMessage
}

export default validator