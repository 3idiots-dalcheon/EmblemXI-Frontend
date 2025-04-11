import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Main.css";

export const Main = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6;
  const [rooms, setRooms] = useState(() => {
    return JSON.parse(localStorage.getItem("rooms")) || [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ name: "", problems: 11, maxPlayers: 2 });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [nickname, setNickname] = useState(() => sessionStorage.getItem("nickname") || ""); // sessionStorage로 종료시까지 유지지

  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  const totalPages = Math.ceil(rooms.length / roomsPerPage);
  const displayedRooms = [...rooms].reverse().slice(
    (currentPage - 1) * roomsPerPage,
    currentPage * roomsPerPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleCreateRoom = () => {
    if (!nickname) {
      setIsLoginModalOpen(true);
      return;
    }
    if (newRoom.name.trim() === "" || newRoom.name.length > 10) return;
    const newRoomData = {
      id: Date.now(),
      ...newRoom,
      players: 1,
      status: "대기중",
      nickname,
    };
    setRooms((prevRooms) => [...prevRooms, newRoomData]);
    setIsModalOpen(false);
    navigate(`/play/${newRoomData.id}`, { state: { ...newRoomData, nickname } });
  };

  const handleRoomClick = (room) => {
    if (room.status === "게임중" || room.players === room.maxPlayers) return;
    if (!nickname) {
      setIsLoginModalOpen(true);
      return;
    }
    navigate(`/play/${room.id}`, { state: { ...room, nickname } });
  };

  const handleLogin = () => {
    if (nickname.trim()) {
      sessionStorage.setItem("nickname", nickname);
      setIsLoginModalOpen(false);
    }
  };

  return (
    <div className="main-container">
      <h1 className="main-logo">
        <img src="/logo.svg" alt="Emblem XI Logo" className="logo-img" />
      </h1>

      <div className="button-container">
        <button className="create-room-btn" onClick={() => {
          if (!nickname) setIsLoginModalOpen(true);
          else setIsModalOpen(true);
        }}>
          방 만들기
        </button>

        <div className="single-play-container" ref={dropdownRef}>
          <button className="single-play-btn" onClick={() => setDropdownOpen((prev) => !prev)}>
            혼자 놀기
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              {[11, 5].map((num) => (
                <div
                  key={num}
                  className="dropdown-item"
                  onClick={() => navigate("/play", { state: { problems: num } })}
                >
                  {num}문제
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="room-list">
        {displayedRooms.map((room) => (
          <div
            key={room.id}
            className={`room-card ${room.status === "게임중" || room.players === room.maxPlayers ? "disabled" : ""}`}
            onClick={() => handleRoomClick(room)}
          >
            <h2 className="room-title">{room.name}</h2>
            <p className="room-players">{room.players}/{room.maxPlayers}</p>
            <p className={`room-status ${room.status === "게임중" ? "in-game" : "waiting"}`}>
              {room.status}
            </p>
            <p className="room-problems">{room.problems}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button className="page-btn" onClick={() => paginate(currentPage - 1)}>
            &lt;
          </button>
        )}

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        {currentPage < totalPages && (
          <button className="page-btn" onClick={() => paginate(currentPage + 1)}>
            &gt;
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>방 만들기</h2>
            <input
              type="text"
              placeholder="방 제목 (최대 10글자)"
              maxLength="10"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            />
            <select onChange={(e) => setNewRoom({ ...newRoom, problems: parseInt(e.target.value) })}>
              <option value={11}>11문제</option>
              <option value={5}>5문제</option>
            </select>
            <select onChange={(e) => setNewRoom({ ...newRoom, maxPlayers: parseInt(e.target.value) })}>
              {[2, 3, 4].map((num) => (
                <option key={num} value={num}>{num}명</option>
              ))}
            </select>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleCreateRoom}>확인</button>
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {isLoginModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>로그인</h2>
            <input
              type="text"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {/* <input type="password" placeholder="비밀번호" /> */}
            {/* <button className="signup-btn">회원가입</button> */}
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleLogin}>확인</button>
              <button className="cancel-btn" onClick={() => setIsLoginModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
