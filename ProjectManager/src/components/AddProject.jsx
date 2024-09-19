import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

function AddProject({ onAdd, onCancel }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const deadlineRef = useRef();
  const modalRef = useRef();

  function handleSave() {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const deadline = deadlineRef.current.value;

    if (
      title.trim() === "" ||
      description.trim() === "" ||
      deadline.trim() === ""
    ) {
      modalRef.current.open();
      return;
    }
    onAdd({ title, description, deadline });
  }

  

  return (
    <>
      <Modal ref={modalRef} buttonConCancelAddProjectaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4 ">Invalid Input!!!</h2>
        <p className="text-stone-600 mb-4 ">Oops..looks like you forgot to enter a value.</p>
        <p className="text-stone-600 mb-4 ">Please make sure you provide a value for every field.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950"
                onClick={onCancel}
            >

              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded bg-stone-800 text-stone-50 hover:text-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={titleRef} label="Title" type="text" />
          <Input ref={descriptionRef} label="Description" textArea />
          <Input ref={deadlineRef} label="Deadline" type="date" />
        </div>
      </div>
    </>
  );
}

export default AddProject;
