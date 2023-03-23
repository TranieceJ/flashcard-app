import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import FormCard from "./FormCard";
function AddCard() {
  // const initialFormState = {
  //     front: "",
  //     back: "",
  // };
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ card: [] }); // deck.card[i].id

  console.log({
    "line 15 ": deck,
    "line 16 ": history,
    "line 17 ": deckId,
  });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  function handleSubmit(card) {
    console.log("line 19 AddCard: ", card);
    createCard(deckId, card);
  }

  function doneHandler() {
    history.push(`/decks/${deckId}`);
  }

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
            Add Card
          </li>
        </ol>
      </nav>

      {<h3>{deck.name} Add Card</h3>}

      <FormCard
        deckName={deck.name}
        initialState={deck}
        onSubmit={handleSubmit}
        onDone={doneHandler}
      />
    </div>
  );
}

export default AddCard;