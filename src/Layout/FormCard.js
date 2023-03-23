import React, { useState } from "react";

function FormCard({
  onSubmit,
  onDone,
  initialState,
  doneButtonLabel = "Done",
}) {
  const [card, setCard] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function submitHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    onSubmit({ ...card });
    setCard({ front: "", back: "" });
  }

  return (
    <form onSubmit={submitHandler} className="card-form">
      <fieldset>
        <div className="form-group">
          <label htmlFor="front">Front </label>
          <textarea
            id="front"
            tabIndex="1"
            type="text"
            name="front"
            value={card.front}
            required={true}
            className="form-control"
            placeholder="Front side of card"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            name="back"
            tabIndex="2"
            className="form-control"
            required={true}
            placeholder="Back side of card"
            value={card.back}
            onChange={changeHandler}
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={onDone}
          tabIndex="4"
        >
          {doneButtonLabel}
        </button>
        <button type="submit" className="btn btn-primary" tabIndex="3">
          Save
        </button>
      </fieldset>
    </form>
  );
}
export default FormCard;
