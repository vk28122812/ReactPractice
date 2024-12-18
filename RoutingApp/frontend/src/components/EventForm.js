import { useNavigate, useNavigation, useActionData, Link } from 'react-router-dom';
import { Form, redirect } from 'react-router-dom';
import classes from './EventForm.module.css';

function EventForm({ method, event }){
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  function cancelHandler() {
    navigate('..');
  }
  return (
    <Form method={method} className={classes.form}>
      {
        data && data.errors && <ul>
          {
          Object.values(data.errors).map((err)=>  <li key={err}>{err}</li>
          )}
        </ul>
      }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required  defaultValue={event ? event.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''}/>
      </p>
      <div className={classes.actions}>
        <button type="button"  onClick={cancelHandler}  disabled={isSubmitting}>
          Cancel
        </button>
        <button  disabled={isSubmitting}>{isSubmitting? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}
export default EventForm;

export async function action({request, params}){
  console.log(request);
  console.log(params)
  
  const fd = await request.formData();
  const method = request.method;
  
  const eventData = {
    title: fd.get('title'),
    image: fd.get('image'),
    date: fd.get('date'),
    description: fd.get('description')
  };
  let url = "http://localhost:8080/events"
  if(method==="PATCH"){
    const id = params.id;
    url = "http://localhost:8080/events/"+id;
  }
  const response = await fetch(url, {
    method,
    headers: {
      'content-type':'application/json'
    },
    body:  JSON.stringify(eventData)
  });
  if(response.status==422){
    return response;
  }
  if(!response.ok){
    throw new Response({message:'Could not save event'}, {status:500 })
  }
  return redirect("/events")
}