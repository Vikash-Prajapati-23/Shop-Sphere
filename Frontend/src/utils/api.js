const API_BASE = process.env.REACT_APP_API_BASE_URL;

export const api = (endpoint) => `${API_BASE}${endpoint}`;
