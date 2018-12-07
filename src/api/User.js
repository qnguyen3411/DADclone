import avi from '../assets/avi.png'
const data = {
  '1': {
    id: 1,
    username: 'Bobbeh',
    avi: avi,
    streak: 37
  },
  '2':  {
    id: 2,
    username: 'Takeiteasy',
    avi: avi,
    streak: 20
  },
  '3':  {
    id: 3,
    username: 'jim',
    avi: avi,
    streak: 40
  },

  '4':  {
    id: 4,
    username: 'moo',
    avi: avi,
    streak: 20
  },
}


export const logUserIn = ({ username, password }) => {
  if (username === 'good' && password === 'good') {
    return Promise.resolve({
      id: 1,
      username: 'good'
    })
  }
  return Promise.reject({
    login: 'Invalid Username/Password'
  })
}

export const registerUser = ({ email, username, password }) => {
  if (username === 'good') {
    return Promise.resolve({
      id: 1,
      username: 'good'
    })
  }
  return Promise.reject({
    username: 'Username already exist'
  })
}

export const fetchUsers = () => {
  return Promise.resolve(data);
}

export const getUserById = (id) => {
  return Promise.resolve(data["" + id])
}

export const fetchLeaderboard = () => {
  return Promise.resolve(data);
}

export const fetchEliminated = () => {
  return Promise.resolve({
    '2': data['2'],
    '3': data['3']
  })
}