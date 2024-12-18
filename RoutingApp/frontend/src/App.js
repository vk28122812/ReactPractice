import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventDetailPage, {
  loader as eventDetailsLoader,
  action as eventDeleteAction
} from "./pages/EventDetailPage";
import {action as manipulateEventAction} from "./components/EventForm"
import HomePage from "./pages/HomePage";
import NewEventPage from "./pages/NewEventPage";
import EditEvent from "./pages/EditEvent";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import Root from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/ErrorPage";
import NewsletterPage, {action as newsletterAction} from "./pages/NewsLetter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path:'newsletter',
        element: <NewsletterPage/>,
        action: newsletterAction
      },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction
          },
          {
            path: ":id",
            id: 'event-detail',
            loader: eventDetailsLoader,
            children: [
              {
                index:true,
                element: <EventDetailPage />,
                action: eventDeleteAction
              },
              {
                path: "edit",
                element: <EditEvent />,
                action: manipulateEventAction
              },
            ],
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <RouterProvider router={router}>
      <div>Hello</div>
    </RouterProvider>
  );
}

export default App;
