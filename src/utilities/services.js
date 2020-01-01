const BASE_URL = 'https://coetus.herokuapp.com';
const API = '/api/forum';
const USERS = '/users';
const MESSAGE = '/message';
const TOPICS = '/topics';

export const getAllUsers = () => {
  return fetch(`${BASE_URL}${API}${USERS}`)
    .then(res => res.json());
}

export const registerUser = (userData) => {
  return fetch(`${BASE_URL}${API}${USERS}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'PUT',
    body: JSON.stringify(userData)
  })
    .then(res => res.json());
}

export const loginUser = (userData) => {
  return fetch(`${BASE_URL}${API}${USERS}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'POST',
    body: JSON.stringify(userData)
  })
    .then(res => res.json());
}

export const getUserInfo = (user_id) => {
  return fetch(`${BASE_URL}${API}${USERS}/${user_id}`)
    .then(res => res.json());
}

export const getAllMessages = () => {
  return fetch(`${BASE_URL}${API}${MESSAGE}`)
    .then(res => res.json());
}

export const getTopicMessages = (topic_id) => {
  return fetch(`${BASE_URL}${API}${MESSAGE}/${topic_id}`)
    .then(res => res.json());
}


export const sendMessage = (username, topic_id, message) => {
  return fetch(`${BASE_URL}${API}${MESSAGE}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'PUT',
    body: JSON.stringify({
      username,
      topic_id,
      message
    })
  })
    .then(res => res.json());
}

export const getAllTopics = () => {
  return fetch(`${BASE_URL}${API}${TOPICS}`)
    .then(res => res.json());
}

export const addNewTopic = (user_id, title) => {
  return fetch(`${BASE_URL}${API}${TOPICS}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'PUT',
    body: JSON.stringify({
      user_id,
      title
    })
  })
    .then(res => res.json());
}