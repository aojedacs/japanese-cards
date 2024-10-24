"use client";
import { useState, useEffect } from "react";
import Card from "./Card";

export default function Home() {
  const allHiragana = [
    { romaji: "a", hiragana: "あ" },
    { romaji: "i", hiragana: "い" },
    { romaji: "u", hiragana: "う" },
    { romaji: "e", hiragana: "え" },
    { romaji: "o", hiragana: "お" },
    { romaji: "ka", hiragana: "か" },
    { romaji: "ki", hiragana: "き" },
    { romaji: "ku", hiragana: "く" },
    { romaji: "ke", hiragana: "け" },
    { romaji: "ko", hiragana: "こ" },
    { romaji: "sa", hiragana: "さ" },
    { romaji: "shi", hiragana: "し" },
    { romaji: "su", hiragana: "す" },
    { romaji: "se", hiragana: "せ" },
    { romaji: "so", hiragana: "そ" },
    { romaji: "ta", hiragana: "た" },
    { romaji: "chi", hiragana: "ち" },
    { romaji: "tsu", hiragana: "つ" },
    { romaji: "te", hiragana: "て" },
    { romaji: "to", hiragana: "と" },
    { romaji: "na", hiragana: "な" },
    { romaji: "ni", hiragana: "に" },
    { romaji: "nu", hiragana: "ぬ" },
    { romaji: "ne", hiragana: "ね" },
    { romaji: "no", hiragana: "の" },
    { romaji: "ha", hiragana: "は" },
    { romaji: "hi", hiragana: "ひ" },
    { romaji: "fu", hiragana: "ふ" },
    { romaji: "he", hiragana: "へ" },
    { romaji: "ho", hiragana: "ほ" },
    { romaji: "ma", hiragana: "ま" },
    { romaji: "mi", hiragana: "み" },
    { romaji: "mu", hiragana: "む" },
    { romaji: "me", hiragana: "め" },
    { romaji: "mo", hiragana: "も" },
    { romaji: "ya", hiragana: "や" },
    { romaji: "yu", hiragana: "ゆ" },
    { romaji: "yo", hiragana: "よ" },
    { romaji: "ra", hiragana: "ら" },
    { romaji: "ri", hiragana: "り" },
    { romaji: "ru", hiragana: "る" },
    { romaji: "re", hiragana: "れ" },
    { romaji: "ro", hiragana: "ろ" },
    { romaji: "wa", hiragana: "わ" },
    { romaji: "wo", hiragana: "を" },
    { romaji: "n", hiragana: "ん" },
  ];
  const [pairsPerLevel, setPairsPerLevel] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [groupedPairs, setGroupedPairs] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [missedPairs, setMissedPairs] = useState([]);
  const [incorrectPairs, setIncorrectPairs] = useState([]);
  const [gameMode, setGameMode] = useState("normal"); // 'normal', 'review', 'completed'

  const startGame = (pairsCount) => {
    setPairsPerLevel(pairsCount);
    const grouped = allHiragana.reduce((acc, curr, i) => {
      const levelIndex = Math.floor(i / pairsCount);
      if (!acc[levelIndex]) acc[levelIndex] = [];
      acc[levelIndex].push(curr);
      return acc;
    }, []);
    setGroupedPairs(grouped);
    setGameStarted(true);

    const levelPairs = grouped[0];
    const gameCards = [
      ...levelPairs.map((pair) => ({
        content: pair.hiragana,
        type: "hiragana",
        matched: false,
        pairId: pair.romaji,
        id: Math.random(),
      })),
      ...levelPairs.map((pair) => ({
        content: pair.romaji,
        type: "romaji",
        matched: false,
        pairId: pair.romaji,
        id: Math.random(),
      })),
    ];

    setCards(gameCards.sort(() => Math.random() - 0.5));
  };

  const handleCardClick = (clickedCard) => {
    if (clickedCard.matched) return;

    if (selectedCards.some((card) => card.id === clickedCard.id)) {
      setSelectedCards(
        selectedCards.filter((card) => card.id !== clickedCard.id)
      );
      return;
    }

    const newSelectedCards = [...selectedCards, clickedCard];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      if (newSelectedCards[0].pairId === newSelectedCards[1].pairId) {
        const newScore = score + 1;
        setScore(newScore);
        setCards(
          cards.map((card) =>
            card.pairId === newSelectedCards[0].pairId
              ? { ...card, matched: true }
              : card
          )
        );
        setSelectedCards([]);

        if (newScore === pairsPerLevel) {
          setTimeout(() => {
            nextLevel();
          }, 500);
        }
      } else {
        // Add incorrect pair to review
        const incorrectPair = groupedPairs[currentLevel].find(
          (pair) =>
            pair.romaji === newSelectedCards[0].pairId ||
            pair.romaji === newSelectedCards[1].pairId
        );
        setMissedPairs((prev) => {
          // Check if pair already exists in review
          if (!prev.some((p) => p.romaji === incorrectPair.romaji)) {
            return [...prev, incorrectPair];
          }
          return prev;
        });

        setIncorrectPairs(newSelectedCards);
        setTimeout(() => {
          setIncorrectPairs([]);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  // const nextLevel = () => {
  //   // Only get pairs that weren't matched at all
  //   const unmatchedPairs = groupedPairs[currentLevel]
  //     .filter(
  //       (pair) =>
  //         !cards.find((card) => card.pairId === pair.romaji && card.matched)
  //     )
  //     .filter(
  //       (pair) =>
  //         // Exclude the last matched pair from being added to review
  //         !selectedCards.some((selected) => selected.pairId === pair.romaji)
  //     );

  //   setMissedPairs((prev) => [...prev, ...unmatchedPairs]);

  //   if (currentLevel < groupedPairs.length - 1) {
  //     const nextLevelIndex = currentLevel + 1;
  //     setCurrentLevel(nextLevelIndex);

  //     const levelPairs = groupedPairs[nextLevelIndex];
  //     const gameCards = [
  //       ...levelPairs.map((pair) => ({
  //         content: pair.hiragana,
  //         type: "hiragana",
  //         matched: false,
  //         pairId: pair.romaji,
  //         id: Math.random(),
  //       })),
  //       ...levelPairs.map((pair) => ({
  //         content: pair.romaji,
  //         type: "romaji",
  //         matched: false,
  //         pairId: pair.romaji,
  //         id: Math.random(),
  //       })),
  //     ];

  //     setCards(gameCards.sort(() => Math.random() - 0.5));
  //     setScore(0);
  //     setSelectedCards([]);
  //   }
  // };

  const nextLevel = () => {
    const unmatchedPairs = groupedPairs[currentLevel].filter(
      (pair) =>
        !cards.find((card) => card.pairId === pair.romaji && card.matched) &&
        !selectedCards.some((selected) => selected.pairId === pair.romaji)
    );

    setMissedPairs((prev) => [...prev, ...unmatchedPairs]);

    if (currentLevel < groupedPairs.length - 1) {
      const nextLevelIndex = currentLevel + 1;
      setCurrentLevel(nextLevelIndex);
      initializeLevel(nextLevelIndex);
    } else {
      setGameMode("completed");
    }
  };

  const startReviewMode = () => {
    setGameMode("review");
    const reviewCards = [
      ...missedPairs.map((pair) => ({
        content: pair.hiragana,
        type: "hiragana",
        matched: false,
        pairId: pair.romaji,
        id: Math.random(),
      })),
      ...missedPairs.map((pair) => ({
        content: pair.romaji,
        type: "romaji",
        matched: false,
        pairId: pair.romaji,
        id: Math.random(),
      })),
    ];

    setCards(reviewCards.sort(() => Math.random() - 0.5));
    setScore(0);
    setPairsPerLevel(missedPairs.length);
    setMissedPairs([]); // Clear the review pairs list
  };

  const resetGame = () => {
    setGameMode("normal");
    setCurrentLevel(0);
    setMissedPairs([]);
    setScore(0);
    initializeLevel(0);
  };

  const initializeLevel = (level) => {
    const levelPairs = groupedPairs[level];
    if (!levelPairs) return;

    const gameCards = [
      ...levelPairs.map((pair) => ({
        content: pair.hiragana,
        type: "hiragana",
        matched: false,
        pairId: pair.romaji,
        id: Math.random(),
      })),
      ...levelPairs.map((pair) => ({
        content: pair.romaji,
        type: "romaji",
        matched: false,
        pairId: pair.romaji,
        id: Math.random(),
      })),
    ];

    setCards(gameCards.sort(() => Math.random() - 0.5));
    setScore(0);
    setSelectedCards([]);
  };

  // Add this function near your other game control functions
  const backToStart = () => {
    setGameStarted(false);
    setCurrentLevel(0);
    setMissedPairs([]);
    setScore(0);
    setCards([]);
    setSelectedCards([]);
    setGameMode("normal");
    setPairsPerLevel(null);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-8">
        <div className="text-4xl font-bold">ひらがな - Romaji</div>
        <h1 className="text-3xl font-bold">Choose Pairs per Level</h1>
        <div className="flex gap-4">
          {[5, 10, 15, 20].map((count) => (
            <button
              key={count}
              onClick={() => startGame(count)}
              className="bg-pink-400 text-white px-8 py-4 rounded-lg hover:bg-pink-500 transition-colors text-xl"
            >
              {count} pairs
            </button>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen h-full gap-8 p-4">
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex justify-between w-full items-center">
          <button
            onClick={backToStart}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back to Start
          </button>
          <div className="text-2xl font-bold">Level {currentLevel + 1}</div>
          <div className="text-2xl font-bold">
            Score: {score}/{pairsPerLevel}
          </div>
          <button
            onClick={nextLevel}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Next Level →
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-8">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 content-start">
            {cards
              .filter((card) => card.type === "hiragana")
              .map((card) => (
                // In the cards mapping section, add the isDisabled logic:
                <Card
                  key={card.id}
                  item={card.content}
                  type={card.type}
                  isFlipped={true}
                  isSelected={selectedCards.some(
                    (selected) => selected.id === card.id
                  )}
                  isMatched={card.matched}
                  isIncorrect={incorrectPairs.some(
                    (incorrect) => incorrect.id === card.id
                  )}
                  isDisabled={
                    selectedCards.length === 1 &&
                    selectedCards[0].type === card.type &&
                    selectedCards[0].id !== card.id
                  }
                  onClick={() => handleCardClick(card)}
                />
              ))}
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 content-start">
            {cards
              .filter((card) => card.type === "romaji")
              .map((card) => (
                // In the cards mapping section, add the isDisabled logic:
                <Card
                  key={card.id}
                  item={card.content}
                  type={card.type}
                  isFlipped={true}
                  isSelected={selectedCards.some(
                    (selected) => selected.id === card.id
                  )}
                  isMatched={card.matched}
                  isIncorrect={incorrectPairs.some(
                    (incorrect) => incorrect.id === card.id
                  )}
                  isDisabled={
                    selectedCards.length === 1 &&
                    selectedCards[0].type === card.type &&
                    selectedCards[0].id !== card.id
                  }
                  onClick={() => handleCardClick(card)}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-80 bg-yellow-100 p-4 rounded-lg h-fit sticky top-4">
        <h3 className="font-bold mb-4 text-lg text-[#212121]">
          Pairs to Review
        </h3>
        <div className="flex flex-col gap-2">
          {missedPairs.map((pair, index) => (
            <div
              key={index}
              className="flex gap-2 bg-white p-3 rounded items-center justify-between text-[#212121]"
            >
              <span className="text-xl">{pair.hiragana}</span>
              <span>-</span>
              <span>{pair.romaji}</span>
            </div>
          ))}
        </div>
      </div>
      {gameMode === "completed" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Game Completed!</h2>
            {missedPairs.length > 0 ? (
              <button
                onClick={startReviewMode}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Practice Review Pairs ({missedPairs.length})
              </button>
            ) : (
              <p className="text-center">Perfect Score! No pairs to review.</p>
            )}
            <button
              onClick={resetGame}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Start New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
