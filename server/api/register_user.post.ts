// import axios from "axios";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  body.token = "qwerty";

  //   make axios call to backend api endpoint
  // const res = await axios.post("http://localhost:8080/signup/register-user", {
  //   username: "Fred",
  //   password: "1234",
  //   email: "frederickaziebu1998@gmail.com",
  //   phoneNumber: "0550815604",
  //   deviceId: "1234",
  // });
  // sign in with user data

  // create redirection to dashboard after sign-up

  // return { res };
});
