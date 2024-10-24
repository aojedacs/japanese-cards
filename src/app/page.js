"use client";
import Image from "next/image";
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
    const gameCards = [...levelPairs.map(pair => ({
      content: pair.hiragana,
      type: 'hiragana',
      matched: false,
      pairId: pair.romaji,
      id: Math.random()
    })),
    ...levelPairs.map(pair => ({
      content: pair.romaji,
      type: 'romaji',
      matched: false,
      pairId: pair.romaji,
      id: Math.random()
    }))];
    
    setCards(gameCards.sort(() => Math.random() - 0.5));
  };

  const handleCardClick = (clickedCard) => {
    if (selectedCards.length === 2) return;
    if (selectedCards.some((card) => card.id === clickedCard.id)) return;
    if (clickedCard.matched) return;

    const newSelectedCards = [...selectedCards, clickedCard];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      if (newSelectedCards[0].pairId === newSelectedCards[1].pairId) {
        setScore((prev) => prev + 1);
        setCards(
          cards.map((card) =>
            card.pairId === newSelectedCards[0].pairId
              ? { ...card, matched: true }
              : card
          )
        );
      }

      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  };

  const nextLevel = () => {
    const unmatchedPairs = groupedPairs[currentLevel].filter(pair => 
      !cards.find(card => card.pairId === pair.romaji && card.matched)
    );
    
    setMissedPairs(prev => [...prev, ...unmatchedPairs]);
  
    if (currentLevel < groupedPairs.length - 1) {
      const nextLevelIndex = currentLevel + 1;
      setCurrentLevel(nextLevelIndex);
      
      const levelPairs = groupedPairs[nextLevelIndex];
      const gameCards = [...levelPairs.map(pair => ({
        content: pair.hiragana,
        type: 'hiragana',
        matched: false,
        pairId: pair.romaji,
        id: Math.random()
      })),
      ...levelPairs.map(pair => ({
        content: pair.romaji,
        type: 'romaji',
        matched: false,
        pairId: pair.romaji,
        id: Math.random()
      }))];
      
      setCards(gameCards.sort(() => Math.random() - 0.5));
      setScore(0);
      setSelectedCards([]);
    }
  };
  

  const initializeLevel = (level) => {
    const levelPairs = groupedPairs[level] || [];
    if (levelPairs.length === 0) return;
  
    const gameCards = [...levelPairs.map(pair => ({
      content: pair.hiragana,
      type: 'hiragana',
      matched: false,
      pairId: pair.romaji,
      id: Math.random()
    })),
    ...levelPairs.map(pair => ({
      content: pair.romaji,
      type: 'romaji',
      matched: false,
      pairId: pair.romaji,
      id: Math.random()
    }))];
    
    setCards(gameCards.sort(() => Math.random() - 0.5));
    setScore(0);
    setSelectedCards([]);
  };
  
  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-8">
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
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="flex justify-between w-full max-w-4xl">
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

      {missedPairs.length > 0 && (
        <div className="w-full max-w-4xl bg-yellow-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Pairs to Review:</h3>
          <div className="flex flex-wrap gap-4">
            {missedPairs.map((pair, index) => (
              <div key={index} className="flex gap-2 bg-white p-2 rounded">
                <span>{pair.hiragana}</span>
                <span>-</span>
                <span>{pair.romaji}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 md:grid-cols-5 gap-4 w-full max-w-4xl">
        {cards &&
          cards.map((card) => (
            <Card
              key={card.id}
              item={card.content}
              type={card.type}
              isFlipped={true}
              isSelected={selectedCards.some(
                (selected) => selected.id === card.id
              )}
              isMatched={card.matched}
              onClick={() => handleCardClick(card)}
            />
          ))}
      </div>
    </div>
  );
}
