import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { Link, useHistory } from "react-router-dom";

const initialFormState = {
  name: "",
  description: "",
};

function CreateDeck() {
  const [formData, setFormData] = useState({ ...initialFormState });
  const history = useHistory();

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(formData)
      .then((newDeck) => {
        history.push(`/decks/${newDeck.id}`);
      })
      .catch((err) => console.log(err));
  };

  const cancelHandler = (e) => {
    console.log("Cancel Clicked!", e.target);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <h1>Create Deck</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Name"> Deck Name</label>
          <input
            type="text"
            className="form-control"
            id="Name"
            name="name"
            aria-describedby="nameHelp"
            placeholder="Enter Deck Name"
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
            placeholder="Deck Desription"
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
          <Link to={`/`}>
            <button href="#" className="btn btn-danger" onClick={cancelHandler}>
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateDeck;
