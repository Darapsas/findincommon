import { API_BASE_URL, ACCESS_TOKEN } from "../helpers/constants";

const request = options => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export const getCurrentUser = () => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: `${API_BASE_URL}/api/users/user/info`,
    method: "GET"
  });
};

export const signin = signinRequest => {
  return request({
    url: `${API_BASE_URL}/auth/signin`,
    method: "POST",
    body: JSON.stringify(signinRequest)
  });
};

export const getUserEvents = userId => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  return request({
    url: `${API_BASE_URL}/api/events/creator/${userId}`,
    method: "GET"
  });
};

export const deleteEvent = eventId => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  return request({
    url: `${API_BASE_URL}/api/events/${eventId}`,
    method: "DELETE"
  });
};
