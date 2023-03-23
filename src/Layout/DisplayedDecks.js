import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

function DisplayedDecks() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  useEffect(loadDecks, []);
  // pass [] to only apply the effect once

  function deleteHandler(deckId) {
    // message alert user
    const confirmed = window.confirm(
      "Delete this deck?\n\nYou will not be able to undo this action once it's deleted."
    );
    // user confirm the action of deletion
    if (confirmed) {
      // use id of the deck to delete
      // Deletes the deck with the specified deckId
      // update state of the deck that was deleted
      // load the deck w/o the deleted deck

      deleteDeck(deckId).then(loadDecks);
    }
  }

  function loadDecks() {
    listDecks().then(setDecks);
    // fetch('listDecks').then(res => res.json()).then(data => setDecks(data)).catch(err => console.log(error))
  }

  const deck = decks.map((deck, index) => {
    return (
      <div key={index} className="card">
        <div className="card-body">
          <div className="row justify-content-between px-2">
            <h5 className="card-title">{deck.name}</h5>
            <h6>{deck.cards.length} cards</h6>
          </div>
          <p className="row card-text px-2">{deck.description}</p>
          <div className="row justify-content-between px-2">
            <div className="pr-1">
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                View
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary mr-2"
              >
                Study
              </Link>

              <button
                className="btn btn-danger"
                onClick={() => deleteHandler(deck.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return deck;
}

export default DisplayedDecks;
