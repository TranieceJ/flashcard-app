import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import FormDeck from "./FormDeck";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);
  //
  function handleSubmit(deck) {
    updateDeck(deck).then(cancelDeckHandler);
  }

  function cancelDeckHandler() {
    history.push(`/decks/${deck.id}`);
  }

  const deckChild = deck.id ? (
    <FormDeck
      initialState={deck}
      onSubmit={handleSubmit}
      onDone={cancelDeckHandler}
      cancelButtonHandler="Cancel"
    />
  ) : (
    <h1>Loading...</h1>
  );

  if (!deck) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/">{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      {deckChild}
    </div>
  );
}

export default EditDeck;
