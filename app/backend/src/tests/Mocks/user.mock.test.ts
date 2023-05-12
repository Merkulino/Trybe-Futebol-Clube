import User from "../../database/models/User";

const loginMock = { email: 'user@mail.com', password: 'secret_user' };

const userMock: User =
  { id: 0, username: 'user', role: 'admin', email: 'user@mail.com', password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO' } as User

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwidXNlcm5hbWUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTQ1MjcxODl9.PnxdfYjFE_5XFOoVdMrdNoVskgdcgjHfjiW2vQbHWzQ'

export { userMock, tokenMock, loginMock }