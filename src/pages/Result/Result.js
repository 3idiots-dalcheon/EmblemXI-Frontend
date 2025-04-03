import React from "react";
import { useLocation } from "react-router-dom";

export const Result = () => {
  const location = useLocation();
  const correctCount = location.state?.correctCount || 0; // state 값이 없을 경우 대비

  return (
    <div>
      <h1>게임 결과</h1>
      <p>맞춘 문제 개수: {correctCount}</p>
    </div>
  );
};

export default Result;
