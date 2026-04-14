import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Cards from "./Components/Cards.jsx";
import FriendDetail from "./Components/FriendDetail.jsx";
import Timeline from "./Components/Timeline.jsx";
import Stats from "./Components/Stats.jsx";
import { FriendsProvider } from "./context/FriendsContext.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Cards />,   // ← Cards renders below Banner on "/"
      },
      {
        path: "friends",
        element: <Cards />,
      },
      {
        path: "friend/:id",
        element: <FriendDetail />,
      },
      {
        path: "timeline",
        element: <Timeline />,
      },
      {
        path: "stats",
        element: <Stats />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <FriendsProvider>
    <RouterProvider router={router} />
  </FriendsProvider>
);