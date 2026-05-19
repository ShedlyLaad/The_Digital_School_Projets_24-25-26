import { adminAxios } from './index';

// Set a higher timeout for admin requests
const axiosWithTimeout = adminAxios.create({
  timeout: 30000, // 30 seconds
});

export const adminService = {
  getDashboard: () => axiosWithTimeout.get('/admin/dashboard'),

  getSurveys: () => axiosWithTimeout.get('/admin/surveys'),

  getSurvey: (id: string) => axiosWithTimeout.get(`/admin/surveys/${id}`),

  getSurveyQuestions: (id: string) => axiosWithTimeout.get(`/admin/surveys/${id}/questions`),

  getQuestions: () => axiosWithTimeout.get('/admin/questions'),

  getResponses: () => axiosWithTimeout.get('/admin/responses'),
};
