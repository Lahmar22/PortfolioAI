import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Auth ──
export const loginUser = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const registerUser = (data: {
  fullname: string;
  email: string;
  password: string;
}) => API.post("/auth/register", data);

// ── Profile ──
export const getMyProfile = () => API.get("/profile/me");

export const updateProfile = (data: {
  title?: string;
  bio?: string;
  location?: string;
  website?: string;
  cv_url?: string;
}) => API.put("/profile/me", data);

// ── Skills ──
export const getMySkills = (profileId: number) =>
  API.get(`/skills/me/${profileId}`);

export const createSkill = (data: {
  profile_id: number;
  name: string;
  level?: number;
}) => API.post("/skills", data);

export const deleteSkill = (id: number, profileId: number) =>
  API.delete(`/skills/${id}/${profileId}`);

// ── Projects ──
export const getMyProjects = (profileId: number) =>
  API.get(`/projects/me/${profileId}`);

export const createProject = (data: {
  profile_id: number;
  title: string;
  description?: string;
  github_url?: string;
}) => API.post("/projects", data);

export const deleteProject = (id: number, profileId: number) =>
  API.delete(`/projects/${id}/${profileId}`);

// ── Education ──
export const getMyEducation = (profileId: number) =>
  API.get(`/education/me/${profileId}`);

export const createEducation = (data: {
  profile_id: number;
  school: string;
  degree?: string;
  start_date?: string;
  end_date?: string;
}) => API.post("/education", data);

export const deleteEducation = (id: number, profileId: number) =>
  API.delete(`/education/${id}/${profileId}`);

// ── Experiences ──
export const getMyExperiences = (profileId: number) =>
  API.get(`/experiences/me/${profileId}`);

export const createExperience = (data: {
  profile_id: number;
  company: string;
  position: string;
  description?: string;
  start_date?: string;
  end_date?: string;
}) => API.post("/experiences", data);

export const deleteExperience = (id: number, profileId: number) =>
  API.delete(`/experiences/${id}/${profileId}`);

// ── Certificates ──
export const getMyCertificates = (profileId: number) =>
  API.get(`/certificates/me/${profileId}`);

export const createCertificate = (data: {
  profile_id: number;
  name: string;
  issuer: string;
  issue_date?: string;
  expiration_date?: string;
  credential_url?: string;
  description?: string;
}) => API.post("/certificates", data);

export const deleteCertificate = (id: number, profileId: number) =>
  API.delete(`/certificates/${id}/${profileId}`);

// ── Social Links ──
export const getMySocialLinks = (profileId: number) =>
  API.get(`/social-links/me/${profileId}`);

export const createSocialLink = (data: {
  profile_id: number;
  platform: string;
  url: string;
}) => API.post("/social-links", data);

export const deleteSocialLink = (id: number, profileId: number) =>
  API.delete(`/social-links/${id}/${profileId}`);

// ── Templates ──
export const getAllTemplates = () => API.get("/templates");

export default API;
