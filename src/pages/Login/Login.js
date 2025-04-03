import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setNickname }) => {
  const [nickname, setLocalNickname] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (nickname.trim()) {
      setNickname(nickname);
      navigate("/main");
    }
  };

  return (
    <div className="login-container">
      <h1>Emblem XI</h1>
      <input
        type="text"
        placeholder="닉네임 입력"
        value={nickname}
        onChange={(e) => setLocalNickname(e.target.value)}
      />
      <button onClick={handleLogin}>시작하기</button>
    </div>
  );
};

export default Login;