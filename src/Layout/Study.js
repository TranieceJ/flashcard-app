import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [count, setCount] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [next, setNext] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const ac = new AbortController();
    async function loadDecks() {
      try {
        const response = await readDeck(deckId, ac.signal);
        console.log(response);
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
    }
    loadDecks();
    return () => ac.abort();
  }, [deckId]);

  console.log(deck);

  const flipButtonHandler = () => {
    setFlipped(!flipped);
    setNext(true);
  };

  const nextButtonHandler = () => {
    if (count === deck.cards.length - 1) {
      if (window.confirm("Restart the Deck?")) {
        setNext(false);
        setFlipped(false);
        setCount(0);
      } else {
        history.push("/");
      }
    } else {
      setNext(false);
      setFlipped(false);
      setCount(count + 1);
    }
  };

  if (!deck) {
    return <h2>Loading Study Deck....</h2>;
  } else if (deck.cards.length <= 2) {
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
              Study
            </li>
          </ol>
        </nav>

        <h1>{deck.name} Study</h1>
        <h2>Not enough cards.</h2>
        <p>
          "You need at least 3 cards to study. There are {deck.cards.length}{" "}
          cards in this deck."
        </p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  } else {
    const card = deck.cards[count];
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
              Study
            </li>
          </ol>
        </nav>
        <div>
          <h1>Study: {deck.name}</h1>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {count + 1} of {deck.cards.length}
            </h5>
            {!flipped && <p className="row card-text px-2">{card.front}</p>}
            {flipped && <p className="row card-text px-2">{card.back}</p>}
            <button
              href="#"
              className="btn btn-secondary mr-2"
              onClick={flipButtonHandler}
            >
              Flip
            </button>
            {next && (
              <button
                href="#"
                className="btn btn-primary "
                onClick={nextButtonHandler}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Study;
