const baseUrl = process.env.REACT_APP_API_URL;

const Urls = {
  baseUrl,

  // User
  newUser: baseUrl + "/user",
  signInUser: baseUrl + "/user/signInUser",

  // Job
  newJob: baseUrl + "/job",
  getJobs: baseUrl + "/jobs",

  // Maker
  jobsByFilter: baseUrl + "/jobsByFilter",
  newQuote: baseUrl + "/newQuote",
};

export default Urls;
