import { adminAxios } from './index';

// Set a higher timeout for login requests
const axiosWithTimeout = adminAxios.create({
  timeout: 30000, // 30 seconds
});

export const authService = {
  login: (email: string, password: string) =>
    axiosWithTimeout.post('/auth/login', { email, password }),

  me: () =>
    adminAxios.post('/auth/me'),
};
