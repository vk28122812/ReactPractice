import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useNavigation();
  const submit = useSubmit();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 10000 //since loader is used then we don't wanna send useQuery request immediately
  });

  // const {mutate} = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async(data) => {
  //     const newEvent = data.event;
  //     await queryClient.cancelQueries({queryKey:['events', params.id]});
  //     const previousEvent = queryClient.getQueryData(['events',params.id]);
  //     queryClient.setQueryData(['events',params.id],newEvent );
  //     return {previousEvent}//this will become context for accessing on Error
  //   },
  //   onError: (error, data,context) => {
  //     queryClient.setQueryData(['events',params.id],context.previousEvent );
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries('events',params.id);
  //   }
  // })

  function handleSubmit(formData) {
    // mutate({id:params.id,event:formData});
    // navigate('../');
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  // if(isPending){
  //   content = (
  //     <div className='center'>
  //       <LoadingIndicator/>
  //     </div>
  //   )
  // }
  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="failed to load event"
          message={error.info?.message || "Failed to load data"}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

//No optimistic updation
export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(["events"]);
  return redirect("../");
}
