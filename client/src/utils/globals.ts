import { getUser, User } from "./auth";

// export const baseUrl = "https://qr-attendance-nrtb.onrender.com/api/";
export const baseUrl = "http://127.0.0.1:8000/api/";

export type LectureType = {
  id: number;
  start: string;
  hours: number;
  name: string;
  code: string;
  lecturer: User;
};

export const style = {
  padding: 1,
};

export const fetchAuth = (route, options, form = false) => {
  const res = getUser();
  const token = res?.token;
  const headers = new Headers();
  headers.append("Authorization", `Token ${token}`);
  if (!form) headers.append("Content-Type", "application/json");

  return fetch(`${baseUrl}${route}`, {
    ...options,
    headers,
  });
};
