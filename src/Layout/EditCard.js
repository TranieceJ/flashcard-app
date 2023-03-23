import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import FormCard from "./FormCard";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [card, setCard] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState({ card: [] });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
    readCard(cardId).then(setCard);
  }, [deckId, cardId]);

  function submitHandler(card) {
    console.log("line 18 EditCard: ", card);
    updateCard(card).then(doneHandler);
  }

  function doneHandler() {
    history.push(`/decks/${deck.id}`);
  }

  const child = card.id ? (
    <FormCard
      initialState={card}
      onSubmit={submitHandler}
      onDone={doneHandler}
      doneButtonLabel="Cancel"
    />
  ) : (
    <h1>Loading...</h1>
  );

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>
              Deck
              {deck.name}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      {child}
    </div>
  );
}
export default EditCard;
