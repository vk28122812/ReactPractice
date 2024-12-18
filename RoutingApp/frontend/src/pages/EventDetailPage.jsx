import React from "react";
import { useRouteLoaderData, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');
  return (
    <EventItem event={data.event}/>
  );
}
export async function loader({request,params}){
  const id = params.id;
  const response = await fetch(`http://localhost:8080/events/${id}`);
  if(!response.ok){
    throw new Response({message: 'Could not fetch select event details'}, {status:404})
  }else{   
    return response;
  }
}

export async function action({request,params}) {
  console.log(request);
  console.log(params);
  
  const id = params.id;
  
  const response = await fetch("http://localhost:8080/events/"+id,{
    method: request.method
  });
  if(!response.ok){
    throw new Response({message:"could not delete event"},{status:500})
  }
  return redirect("/events");  
}