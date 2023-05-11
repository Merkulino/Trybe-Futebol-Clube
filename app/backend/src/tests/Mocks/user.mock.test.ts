import User from "../../database/models/User";

const loginMock = { email: 'user@mail.com', password: '123456' };

const userMock: User =
  { id: 0, username: 'user', role: 'admin', email: 'user@mail.com' } as User

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc'

export { userMock, tokenMock, loginMock }