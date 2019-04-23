import { API_BASE_URL, ACCESS_TOKEN } from "../helpers/constants";

// DOOOOOOOOOOOOONNNNNNNNNNNNN'TTTTTTTT FUCKING FORGET to check method formatting

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

const getUserConversations = userId =>
  request({
    url: `${API_BASE_URL}/api/conversations/user/${userId}`,
    method: "GET"
  });

const getUserCreatedConversations = userId =>
  request({
    url: `${API_BASE_URL}/api/conversations/creator/${userId}`,
    method: "GET"
  });

const getUserEvents = userId =>
  request({
    url: `${API_BASE_URL}/api/events/user/${userId}`,
    method: "GET"
  });

const getConversationMessages = id =>
  request({
    url: `${API_BASE_URL}/api/messages/conversation/${id}`,
    method: "GET"
  });

const postMessage = message =>
  request({
    url: `${API_BASE_URL}/api/messages`,
    method: "POST",
    body: JSON.stringify(message)
  });

const getUserCreatedEvents = userId =>
  request({
    url: `${API_BASE_URL}/api/events/creator/${userId}`,
    method: "GET"
  });

const getReminderTypes = () =>
  request({
    url: `${API_BASE_URL}/api/reminders`,
    method: "GET"
  });

const deleteConversation = eventId =>
  request({
    url: `${API_BASE_URL}/api/conversations/${eventId}`,
    method: "DELETE"
  });

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

const getUserHobbies = userId =>
  request({
    url: `${API_BASE_URL}/api/users/${userId}/hobbies`,
    method: "GET"
  });

const removeUserHobby = (userId, id) =>
  request({
    url: `${API_BASE_URL}/api/users/${userId}/hobby/${id}`,
    method: "DELETE"
  });

const addUserHobby = (userId, id) =>
  request({
    url: `${API_BASE_URL}/api/users/${userId}/hobby/${id}`,
    method: "POST"
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

const createConversation = event =>
  request({
    url: `${API_BASE_URL}/api/conversations`,
    method: "POST",
    body: JSON.stringify(event)
  });

const updateConversation = (event, id) =>
  request({
    url: `${API_BASE_URL}/api/conversations/${id}`,
    method: "PUT",
    body: JSON.stringify(event)
  });

const createEvent = event =>
  request({
    url: `${API_BASE_URL}/api/events`,
    method: "POST",
    body: JSON.stringify(event)
  });

const updateEvent = (event, id) =>
  request({
    url: `${API_BASE_URL}/api/events/${id}`,
    method: "PUT",
    body: JSON.stringify(event)
  });

const updateProfile = (id, user) =>
  request({
    url: `${API_BASE_URL}/api/users/${id}`,
    method: "PUT",
    body: JSON.stringify(user)
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
  deleteConversation,
  getUserEvents,
  getUserConversations,
  getCurrentUser,
  getHobbies,
  getEvents,
  updateProfile,
  getCertainHobbies,
  getMembersByHobbies,
  getUserCreatedEvents,
  getUserCreatedConversations,
  getUserHobbies,
  getMembers,
  getReminderTypes,
  updateEvent,
  updateConversation,
  createEvent,
  createConversation,
  removeUserHobby,
  addUserHobby,
  getConversationMessages,
  postMessage,
  login,
  signup
};
