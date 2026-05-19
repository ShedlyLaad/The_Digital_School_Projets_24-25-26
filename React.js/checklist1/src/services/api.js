import axios from 'axios';

const API_URL = 'https://greenvelvet.alwaysdata.net/pfc/';
const TOKEN = 'YOUR_TOKEN_HERE';

export const getChecklists = async () => {
  const response = await axios.get(`${API_URL}checklists`, {
    headers: { 'token': TOKEN }
  });
  return response.data.response;
};

export const getChecklist = async (id) => {
  const response = await axios.get(`${API_URL}checklist?id=${id}`, {
    headers: { 'token': TOKEN }
  });
  return response.data;
};

export const addChecklist = async (checklist) => {
  const response = await axios.post(`${API_URL}checklist/add`, checklist, {
    headers: { 'token': TOKEN }
  });
  return response.data.id;
};

export const updateChecklist = async (id, checklist) => {
  const response = await axios.post(`${API_URL}checklist/update`, { ...checklist, id }, {
    headers: { 'token': TOKEN }
  });
  return response.data.done;
};

export const deleteChecklist = async (id) => {
  const response = await axios.get(`${API_URL}checklist/delete?id=${id}`, {
    headers: { 'token': TOKEN }
  });
  return response.data.done;
};
