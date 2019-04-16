import { API_BASE_URL, ACCESS_TOKEN } from "../helpers/constants";

const request = options => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
  });

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  switch (options.method) {
    case "PUT":
      return fetch(options.url, options);
    case "POST":
      return fetch(options.url, options);
    case "DELETE":
      return fetch(options.url, options);
    default:
      return fetch(options.url, options).then(response => response.json());
  }
};

const getUserEvents = () => {
  request({
    url: `${API_BASE_URL}/api/events`,
    method: "GET"
  });
};

const deleteEvent = eventId =>
  request({
    url: `${API_BASE_URL}/api/events/${eventId}`,
    method: "DELETE"
  });

const getCurrentUser = () =>
  request({
    url: `${API_BASE_URL}/api/users/user/info`,
    method: "GET"
  });

const getMembers = () =>
  request({
    url: `${API_BASE_URL}/api/users`,
    method: "GET"
  });

const getEvents = () =>
  request({
    url: `${API_BASE_URL}/api/events`,
    method: "GET"
  });

const getMembersByHobbies = hobbies =>
  request({
    url: `${API_BASE_URL}/api/users/hobbies/${hobbies}`,
    method: "GET"
  });

const getHobbies = () =>
  request({
    url: `${API_BASE_URL}/api/hobbies`,
    method: "GET"
  });

const getCertainHobbies = searchQuery =>
  request({
    url: `${API_BASE_URL}/api/hobbies/search/${searchQuery}`,
    method: "GET"
  });

const login = loginRequest =>
  request({
    url: `${API_BASE_URL}/auth/login`,
    method: "POST",
    body: JSON.stringify(loginRequest)
  });

const signup = signupRequest =>
  request({
    url: `${API_BASE_URL}/auth/signup`,
    method: "POST",
    body: JSON.stringify(signupRequest)
  });

export {
  deleteEvent,
  getUserEvents,
  getCurrentUser,
  getHobbies,
  getEvents,
  getCertainHobbies,
  getMembersByHobbies,
  getMembers,
  login,
  signup
};
