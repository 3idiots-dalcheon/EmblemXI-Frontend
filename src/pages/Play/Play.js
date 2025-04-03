import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Play.css";

const questions = [
  { answer: "스티븐 제라드", image: "/images/players/stevengerrard.jpg", hint: "잉글랜드", logos: ["/images/logos/liverpool.svg", "/images/logos/lagalaxy.svg"] },
  { answer: "리오넬 메시", image: "/images/players/lionelmessi.jpg", hint: "아르헨티나", logos: ["/images/logos/barcelona.svg", "/images/logos/psg.svg", "/images/logos/intermiami.svg"] },
  { answer: "트렌트 알렉산더아놀드", image: "/images/players/trentalexanderarnold.jpg", hint: "잉글랜드", logos: ["/images/logos/liverpool.svg"] },
  { answer: "킬리안 음바페", image: "/images/players/kylianmbappe.jpg", hint: "프랑스", logos: ["/images/logos/asmonaco.svg", "/images/logos/psg.svg", "/images/logos/realmadrid.svg"] },
];

export const Play = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [inputValue, setInputValue] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];

  // 타이머 설정
  useEffect(() => {
    if (timeLeft > 0 && !showAnswer) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      if (timeLeft === 40) setShowHint(true); // 40초 남았을 때 힌트 표시
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleShowAnswer();
    }
  }, [timeLeft, showAnswer]);

  // 정답 보여주기 (오버레이 팝업)
  const handleShowAnswer = (updatedCount) => {
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      nextQuestion(updatedCount);
    }, 3000); // 3초 후 다음 문제
  };
  

  // 다음 문제로 이동
  const nextQuestion = (updatedCount) => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(60);
      setInputValue("");
      setShowHint(false);
      setIsCorrect(null);
    } else {
      navigate("/result", { state: { correctCount: updatedCount } }); // 최신 정답 개수 반영
    }
  };

  // 정답 체크
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === currentQuestion.answer) {
      setCorrectCount((prevCount) => {
        const newCount = prevCount + 1;
        handleShowAnswer(newCount);
        return newCount;
      });
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };
  

  return (
    <div className="game-container">
      {showAnswer && (
        <div className="answer-overlay">
          <div className="answer-popup">
            <div className="answer-image-container">
              <img src={currentQuestion.image} alt={currentQuestion.answer} className="answer-image" />
            </div>
            <div className="player-name">{currentQuestion.answer}</div>
          </div>
        </div>
      )}

      <div className="game-box">
        <div className="top-bar">
          <span>Round {currentIndex + 1}/{questions.length}</span>
          <span>{timeLeft}</span>
        </div>
        <div className="logos">
          {currentQuestion.logos.map((logo, index) => (
            <img key={index} src={logo} alt={`team-logo-${index}`} className="team-logo" />
          ))}
        </div>
        {showHint && <div className="hint">힌트: {currentQuestion.hint}</div>}
        {isCorrect === false && <div className="incorrect">오답!</div>}
      </div>

      <form onSubmit={handleSubmit} className="answer-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="정답 입력..."
        />
        <button type="submit">제출</button>
      </form>
      <div className="correct-count">정답 {correctCount}</div>
    </div>
  );
};

export default Play;
