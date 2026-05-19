// Re-export split API modules (public, auth, admin)
export * from './publicApi';
export * from './authApi';
export * from './adminApi';

// Also export axios instances if needed elsewhere
export { publicAxios, adminAxios } from './index';