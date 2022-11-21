

function response(res, message, status= 200){
  let resp = {}
  if(typeof message === "string"){
    resp = { message: message }
  } else {
    resp = message
  }
  res.status(status).json(resp)
}

export default  response