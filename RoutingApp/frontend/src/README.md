### Outlet
The `Outlet` component is used as a placeholder in the parent route elements to render the matched child route elements. It allows nested routes to be displayed within the parent route's layout.

Example usage in [frontend/src/pages/Root.jsx](frontend/src/pages/Root.jsx):
```jsx
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function Root() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
```

### Loader

The `loader` function is used to fetch data before rendering a route. It allows you to load data asynchronously and pass it to the route component as props.

We can any browser APIs in loader but not any hook because loader is a function not a functional component;


```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: async () => {
              const response = await fetch("http://localhost:8080/events");  
              if (!response.ok) {
                // Handle error
              } else {
                const resData = await response.json();
                return resData.events;
              }
            },
          },
          // Other routes...
        ],
      },
      // Other routes...
    ],
  },
]);
```
```jsx
import {useLoaderData} from "react-router-dom"
import EventsList from '../components/EventsList';

function EventsPage() {
  const events = useLoaderData();
  return (
    <>
      <EventsList events={events} />
    </>
  );
}
```

`Note`: We can use useLoaderData() in the element that's assigned to a route and in all components that might be used inside that component.


`Note`: loader functions get two important objects: request and params which can be utilized to call backends.

```jsx
export default function EventDetailPage() {
  
  const data = useLoaderData();
  return (
    <EventItem event={data.event}/>
  );
}
export async function loader({request,params}){
  console.log(request);
  console.log(params);
  const id = params.id;
  const response = await fetch(`http://localhost:8080/events/${id}`);
  if(!response.ok){
    throw new Response({message: 'Could not fetch select event details'}, {status:404})
  }else{
    return response; 
  }
}
```

We can also use loaders in various pages using useRouteLoaderData() hook.

We can use actions to submit data. Standard way is to use Form from react-router-dom;

```jsx

export async function action({request, params}){
  const fd = await request.formData();
  console.log(fd);
  
  const eventData = {
    title: fd.get('title'),
    image: fd.get('image'),
    date: fd.get('date'),
    description: fd.get('description')
  };
  const response = await fetch("http://localhost:8080/events", {
    method: 'POST',
    headers: {
      'content-type':'application/json'
    },
    body:  JSON.stringify(eventData)
  });
  if(!response.ok){
    throw new Response({message:'Could not save event'}, {status:500 })
  }
  return redirect("/events")
}
```


`Note`: The `useFetcher` hook from `react-router-dom` can be used for more flexible data fetching and form submissions without navigating away from the current page. It provides a way to interact with loaders and actions programmatically.

