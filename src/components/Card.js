import React from "react";

const Card = ({ card, handleClick, flipped }) => {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front " src={card.src} alt="" />
        <img
          className="back"
          onClick={() => handleClick(card)}
          src="/img/cover.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Card;
