import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteDeck, deleteCard, readDeck, listDecks } from "../utils/api";
import ViewCards from "./ViewCards";

function ViewDeck() {
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();
  const {url} = useRouteMatch()
  const history = useHistory();
  useEffect(loadDeck, [deckId]);

  function loadDeck() {
    //call fetch function to render decks list
    readDeck(deckId).then(setDeck);
  }

  console.log(deck);

  const handleDeckDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this deck? You will not be able to undo this once completed."
    ); //confirm delete request

    if (confirmed) {
      deleteDeck(deck.id).then(history.push("/")); //delete then go back to home page
    }
  };

  const deleteCardHandler = (cardId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this card? You will not be able to undo this once completed."
    );
    if (confirmed) {
      deleteCard(cardId).then(loadDeck); //delete then load new deck without deleted card
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <div className="container">
        <div className="row justify-content-between">
          <div>
            <Link
              to={`/decks/${deck.id}/edit`}
              className="btn btn-secondary mr-2"
            >
              Edit
            </Link>
            <Link
              to={`decks/${deck.id}/study`}
              className="btn btn-primary mr-2"
            >
              Study
            </Link>
            <Link to={`${url}/cards/new`} className="btn btn-success">
              Add Card
            </Link>
          </div>
          <button
            id={deck.id}
            className="btn btn-danger ms-2"
            onClick={handleDeckDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-3">
        <ViewCards deck={deck} deleteCardHandler={deleteCardHandler} />
      </div>
    </div>
  );
}

export default ViewDeck;
 