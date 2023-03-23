import React, { useState } from "react";

function FormDeck({
  initialState,
  onSubmit,
  onDone,
  cancelButtonHandler = "Cancel",
}) {
  const [formData, setFormData] = useState(initialState);

  const changeHandler = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    onSubmit({ ...formData });
    setFormData({ name: "", description: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="Name"> Deck Name</label>
        <input
          type="text"
          className="form-control"
          id="Name"
          name="name"
          aria-describedby="nameHelp"
          onChange={changeHandler}
          value={formData.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Description">Deck Description</label>
        <textarea
          rows="4"
          type="text"
          className="form-control"
          id="desription"
          name="description"
          onChange={changeHandler}
          value={formData.description}
        />
      </div>
      <div className="row justify-content-between px-2">
        <div className="pr-1">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <button href="#" className="btn btn-danger" onClick={onDone}>
          <i className="bi bi-trash pr-1"></i>
          {cancelButtonHandler}
        </button>
      </div>
    </form>
  );
}

export default FormDeck;
