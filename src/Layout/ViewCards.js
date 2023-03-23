import React from "react";
import { Link } from "react-router-dom";
// Link buttons on page
function ViewCards({ deck, deleteCardHandler }) {
  if (!deck || !deck.cards) {
    return null;
  }

  const { cards = [] } = deck;

  return cards.map((card, index) => {
    return (
      <div key={index} className="card">
        <div className="card-body">
          <div className="row justify-content-between px-2">
            <p className="col card-text px-2">{card.front}</p>
            <p className="col card-text px-2">{card.back}</p>
          </div>
          <div className="row justify-content-between px-2">
            <div className="pr-1">
              <Link
                to={`/decks/${deck.id}/cards/${card.id}/edit`}
                className="btn btn-secondary mr-2"
                title="Edit deck"
              >
                Edit
              </Link>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => deleteCardHandler(card.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
}

export default ViewCards;
 