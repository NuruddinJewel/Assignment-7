import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Components/Layout/Layout.jsx";
import Cards from "./Components/Cards.jsx";
import FriendDetail from "./Components/FriendDetail.jsx";
import Timeline from "./Components/Timeline.jsx";
import Stats from "./Components/Stats.jsx";
import NotFound from "./Components/Notfound.jsx";
import { FriendsProvider } from "./context/FriendsContext.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Cards /> },
      { path: "friends", element: <Cards /> },
      { path: "friend/:id", element: <FriendDetail /> },
      { path: "timeline", element: <Timeline /> },
      { path: "stats", element: <Stats /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <FriendsProvider>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '12px',
          background: '#1F2937',
          color: '#fff',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#2D4F42',
            secondary: '#fff',
          },
        },
      }}
    />
    <RouterProvider router={router} />
  </FriendsProvider>
);