export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const SIGUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_ROUTE = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMG_ROUTE = `${AUTH_ROUTES}/add-profile-img`;
export const REMOVE_PROFILE_IMG_ROUTE = `${AUTH_ROUTES}/remove-profile-img`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const CONTACTS_ROUTE = `api/contacts`;
export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROUTE}/search`;

export const MESSAGES_ROUTES = "/api/messages";
export const GET_ALL_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/get-messages`;
