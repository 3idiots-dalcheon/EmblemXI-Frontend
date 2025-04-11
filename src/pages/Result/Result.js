import React from "react";
import { useLocation } from "react-router-dom";

export const Result = () => {
  const location = useLocation();
  const correctCount = location.state?.correctCount || 0; // state 값이 없을 경우 대비
  const nickname = sessionStorage.getItem("nickname"); // 세션에 저장 된 닉네임 가져 옴

  return (
    <div>
      <h1>게임 결과</h1>
      <h2>{nickname}</h2>
      <p>{correctCount}개 정답</p>
    </div>
  );
};

export default Result;
