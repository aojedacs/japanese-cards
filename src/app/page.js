"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Card from "./Card";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    const gameCards = [...pairs.map(pair => ({
      content: pair.hiragana,
      type: 'hiragana',
      matched: false,
      pairId: pair.romaji,
      id: Math.random()
    })),
    ...pairs.map(pair => ({
      content: pair.romaji,
      type: 'romaji',
      matched: false,
      pairId: pair.romaji,
      id: Math.random()
    }))];
    
    setCards(gameCards.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (clickedCard) => {
    if (selectedCards.length === 2) return;
    if (selectedCards.some(card => card.id === clickedCard.id)) return;

    const newSelectedCards = [...selectedCards, clickedCard];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      if (newSelectedCards[0].pairId === newSelectedCards[1].pairId) {
        setScore(prev => prev + 1);
        setCards(cards.map(card => 
          card.pairId === newSelectedCards[0].pairId 
            ? { ...card, matched: true }
            : card
        ));
      }
      
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  };
  const pairs = [
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

  return (
    <>
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="text-2xl font-bold">Score: {score}</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            item={card.content}
            isFlipped={selectedCards.some(selected => selected.id === card.id) || card.matched}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
    </>
  );
}
