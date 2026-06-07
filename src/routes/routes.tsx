import { type RouteObject } from "react-router";
import Dashboard from "../features/dashboard/Dashboard";

export const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
];
