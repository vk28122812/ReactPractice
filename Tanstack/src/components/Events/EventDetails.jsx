import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useState } from "react";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, fetchEvent, queryClient } from "../../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";
export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none", //not triggered immediately
      });
      navigate("/events");
    },
  });
  function handleStartDelete() {
    setIsDeleting(true);
  }
  function handleStopDelete() {
    setIsDeleting(false);
  }
  function handleDelete() {
    mutate({ id });
  }
  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this event? This action cannot be
            undone
          </p>
          <div className="form-actions">
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button onClick={handleStopDelete} className="button-text">
                  Cancel
                </button>
                <button onClick={handleDelete} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock
              title="failed to delete event"
              message={deleteError.info?.message || "Failed to delete message"}
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isLoading && <p>Loading event...</p>}
      {!isLoading && (
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={handleStartDelete}>Delete</button>

              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt={data.image} />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>
                  {data.date} {data.time}
                </time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      )}
      {isError && (
        <ErrorBlock
          title="Failed to fetch event"
          message="could not fetch event details."
        />
      )}
    </>
  );
}
