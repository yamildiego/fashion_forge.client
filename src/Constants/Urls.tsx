const baseUrl = process.env.REACT_APP_API_URL;

const Urls = {
  baseUrl,

  // User
  newUser: baseUrl + "/user",
  getCurrentUser: baseUrl + "/user",
  signInUser: baseUrl + "/user/signInUser",
  signOutUser: baseUrl + "/user/signOutUser",

  // Job
  getJobById: baseUrl + "/job",
  newJob: baseUrl + "/job",
  editJob: baseUrl + "/job/editJob",
  getJobs: baseUrl + "/jobs",
  publishJob: baseUrl + "/job/publishJob",
  uploadImages: baseUrl + "/job/uploadImages",

  // Maker
  jobsByFilter: baseUrl + "/jobsByFilter",
  newQuote: baseUrl + "/newQuote",
};

export default Urls;
