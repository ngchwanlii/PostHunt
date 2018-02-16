const uuidv4 = require('uuid/v4');

// setup token
let token = localStorage.token
if(!token){
  token = localStorage.token = uuidv4()
}

// setup headers
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// setup port
const ports = 3001
const url = `http://localhost:${ports}`

// export api
const api =  {
  headers,
  url
}

export default api
