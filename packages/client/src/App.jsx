import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DetailPage,
  ErrorPage,
  LandingPage,
  PageLayout,
  TrackPage,
} from "@pages";
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
        element: <TrackPage />,
      },
      {
        path: "track/:recordId",
        element: <DetailPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
