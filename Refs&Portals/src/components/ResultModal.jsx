import React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, reset },
  ref
) {
  const dialog = useRef();
  const userLost = remainingTime <= 0;
  const formattedTimeRemaining = (remainingTime / 1000).toFixed(2);
  const score = Math.abs(
    (1 - remainingTime / (targetTime * 1000)) * 100
  ).toFixed(0);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>User lost</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>
          {formattedTimeRemaining} second
          {formattedTimeRemaining > 1 ? "s" : ""} left.
        </strong>
      </p>
      <form method="dialog" onSubmit={reset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
