import { useLoaderData, Await, defer } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;
  return <EventsList events={events} />;
  // return (
  //   <Suspense fallback={<p style={{textAlign:"center"}}>Loading...</p>}>
  //     <Await resolve={data.events}>
  //       {(loadedEvents) => <EventsList event={loadedEvents} />}
  //     </Await>
  //   </Suspense>
  // );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events'};
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });
    // return json({ message: "could not fetch events" }, { status: 500 });
  } else {
    return response;
    // const resData = await response.json();
    // return resData.events;
  }
}
export function loader() {
  return loadEvents();
  // return defer({
  //   events: loadEvents(),
  // });
}
