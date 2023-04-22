// const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = "http://localhost:3333";
// const baseUrl = "http://127.0.0.1:3333";

const Urls = {
  baseUrl,

  // User
  newUser: baseUrl + "/user",
  signInUser: baseUrl + "/user/signInUser",

  // Job
  newJob: baseUrl + "/job",
  getJobs: baseUrl + "/jobs",

  // Maker
  getAllJobs: baseUrl + "/getAllJobs",
};

export default Urls;
