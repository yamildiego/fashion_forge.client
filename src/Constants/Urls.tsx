// const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = "http://127.0.0.1:3333";

const Urls = {
  baseUrl,

  // Client
  newClient: baseUrl + "/client",
  getExistingClient: baseUrl + "/client/getExistingClient",
};

export default Urls;
