const Die = ({ die, freezeDice, numbersMod, tenzi ,newGame}) => {
  function changeMode() {
    const dots = [];
    for (let i = 0; i < +die.value; i++) {
      dots.push(<span key={i} className="die w-3 h-3 bg-white rounded-full"></span>);
    }
    return dots;
  }

  return (
    <span
      className={`dieSpan ${(tenzi || newGame) && "pointer-events-none"} ${numbersMod ? "flex justify-center items-center" : "grid place-items-center"} ${die.isHeld ? `bg-green-600` : `bg-indigo-500 `} ${
        +die.value < 2 ? "grid-cols-1" : "grid-cols-2"
      } `}
      onClick={() => {
        freezeDice(die.id);
      }}
    >
      {numbersMod ? die.value : changeMode()}
    </span>
  );
};

export default Die;
