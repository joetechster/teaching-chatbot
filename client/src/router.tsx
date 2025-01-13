import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { redirect } from "react-router-dom";
import { getUser, User } from "./utils/auth";
import Home from "./pages/Home";
import { fetchAuth, LectureType } from "./utils/globals";
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Lecture = lazy(() => import("./pages/Lecture"));

export type Attend = { id: number; student: User; time: string; lecture: number };
export type LectureLoader = {
  present: boolean;
  allPresent: Attend[];
  lecture: LectureType;
};

const router = createBrowserRouter([
  { path: "/", element: <Home />, loader: loginRequiredLoader },
  { path: "sign-in", element: <SignIn /> },
  { path: "sign-up", element: <SignUp /> },
  { path: "lecture/:id", element: <Lecture />, loader: lectureLoader },
]);

async function loginRequiredLoader() {
  const auth = getUser();
  if (!auth) return redirect("/sign-in");
  return auth;
}

async function lectureLoader({ params }) {
  const { id } = params;
  const auth = await loginRequiredLoader();
  if (auth instanceof Response) return auth;
  const { user } = auth;
  // check if logged-in user is present or not
  const responses = await Promise.all([
    await (await fetchAuth(`lecture/${id}/student/${user.id}/presence/`, {})).json(),
    await (await fetchAuth(`lecture/${id}/present/`, {})).json(),
    await (await fetchAuth(`lecture/${id}/`, {})).json(),
  ]);
  return { ...responses[0], allPresent: responses[1], lecture: responses[2] };
}
export default router;
