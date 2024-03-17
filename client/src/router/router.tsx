import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../shared/components/Layout/Layout";
import { ErrorPage } from "../shared/components/ErrorPage/ErrorPage";
import { Home } from "../features/Home/containers/Home";

import { UserList } from "../features/UserList/containers/UserList";
import { Profile } from "../features/Profile/containers/Profile/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import { Auth } from "../features/Auth/containers/Auth";

//!Create router for each feature
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
