import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

import Die from "./Die";
import Info from "./Info";
import ToggleBtn from "./ToggleBtn";
import Records from "./Records";
import Form from "./Form";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzi, setTenzi] = useState(false);
  const [newGame, setNewGame] = useState(true);
  const [numbersMod, setNumbersMod] = useState(false);
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")));
  const [timer, setTimer] = useState(0);
  const [stats, setStats] = useState(() => JSON.parse(localStorage.getItem("stats")) || []);
  const [intervalId, setIntervalId] = useState(0);

  function startTimer() {
    const tick = setInterval(() => {
      setTimer((pre) => pre + 1);
      setIntervalId(tick);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(intervalId);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStats((pre) => [{ username: e.target.username.value, id: nanoid(), trials: 0, time: 0 }, ...pre]);
    setNewGame(!newGame);
    startTimer();
  }

  function updateUser() {
    setStats((pre) => pre.map((user, index) => (index === 0 ? { ...user, trials: user.trials + 1 } : user)));
  }

  function randomValue() {
    return Math.ceil(Math.random() * 6);
  }

  function allNewDice() {
    const arrOfDice = [];
    for (let i = 1; i <= 10; i++) {
      let die = { value: randomValue(), isHeld: false, id: i };
      arrOfDice.push(die);
    }
    return arrOfDice;
  }

  function rollDice() {
    if (!tenzi) {
      updateUser();
      setDice((pre) => {
        return pre.map((die) => (die.isHeld ? die : { ...die, value: randomValue() }));
      });
    } else {
      setNewGame(!newGame);
      setDice(allNewDice());
    }
  }

  function freezeDice(id) {
    setDice((pre) => {
      return pre.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die));
    });
  }

  useEffect(() => {
    const allSame = dice.every((die) => {
      let randomDieValue = dice[2].value;
      return die.isHeld && die.value === randomDieValue;
    });

    setTenzi(allSame);
    if (allSame) {
      setStats((pre) => pre.map((user, index) => (index === 0 ? { ...user, time: timer } : user)));
      stopTimer();
    }
  }, [dice]);

  useEffect(() => {
    window.localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

   useEffect(() => {
    darkMode ? document.body.classList.add("dark") : document.body.classList.remove("dark");
    localStorage.setItem("darkMode",darkMode)
  }, [darkMode]);

  const dieElements = dice.map((die) => <Die key={die.id} die={die} freezeDice={freezeDice} numbersMod={numbersMod} newGame={newGame} tenzi={tenzi} />);

 

  return (
    <main className="wrapper px-5 bg-neutral-50 flex flex-col justify-center items-center h-screen dark:bg-gray-900">
      {tenzi && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="card flex flex-col p-5 w-[400px]  rounded-md shadow-lg shadow-white-100 dark:bg-gray-800">
        <Info tenzi={tenzi} />
        <div className="dice p-4 flex justify-center gap-2 flex-wrap ">{dieElements}</div>
        {newGame ? (
          <Form handleSubmit={handleSubmit} />
        ) : (
          <button className={`die-roll-btn ${tenzi ? "bg-indigo-600" : "bg-green-600"}`} onClick={rollDice}>
            {tenzi ? `New game` : `Roll`}
          </button>
        )}

        <ToggleBtn btnText={"Nums mode"} handleChange={() => setNumbersMod((pre) => !pre)} />

        <ToggleBtn btnText={"Switch theme"} handleChange={() => setDarkMode((pre) => !pre)} />
      </div>
      {tenzi && <Records stats={stats} />}
    </main>
  );
}

export default App;
