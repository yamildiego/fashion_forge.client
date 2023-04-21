// const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = "http://localhost:3333";
// const baseUrl = "http://127.0.0.1:3333";

const Urls = {
  baseUrl,

  // Client
  newClient: baseUrl + "/client",
  getCreatedClient: baseUrl + "/client/getCreatedClient",

  // Job
  newJob: baseUrl + "/job",
  getJobs: baseUrl + "/jobs",

  // Maker
  getAllJobs: baseUrl + "/getAllJobs",
};

export default Urls;
