import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DetailPage,
  ErrorPage,
  LandingPage,
  PageLayout,
  TrackPage,
} from "@pages";
import { EditPage } from "./pages";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "track",
        children: [
          {
            index: true,
            element: <TrackPage />,
          },
          {
            path: ":recordId",
            element: <DetailPage />,
          },
          {
            path: "create",
            element: <EditPage />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
