import React from "react";
import { Link } from "react-router-dom";

import DisplayedDecks from "./DisplayedDecks";
function Home({ decks }) {
  return (
    <div>
      <div className="pb-1">
        <Link to={"/decks/new"} className="btn btn-secondary">
          Create Deck
        </Link>
      </div>
      <DisplayedDecks />
    </div>
  );
}

export default Home;
 