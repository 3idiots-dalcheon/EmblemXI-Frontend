import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Main.css";

export const Main = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const roomsPerPage = 6; // 한 페이지에 표시할 방 개수
  const [rooms, setRooms] = useState(() => {
    return JSON.parse(localStorage.getItem("rooms")) || [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ name: "", problems: 11, maxPlayers: 2 });

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
    if (newRoom.name.trim() === "" || newRoom.name.length > 10) return;
    const newRoomData = {
      id: Date.now(),
      ...newRoom,
      players: 1, // 방을 만든 사람은 자동으로 참여
      status: "대기중",
    };
    setRooms((prevRooms) => [...prevRooms, newRoomData]); // 최신 방이 위에 배치되도록 역순 정렬
    setIsModalOpen(false);
    navigate(`/play/${newRoomData.id}`, { state: newRoomData });
  };

  return (
    <div className="main-container">
      <h1 className="main-logo">
        <img src="/logo.svg" alt="Emblem XI Logo" className="logo-img" />
      </h1>

      <div className="button-container">
        <button className="create-room-btn" onClick={() => setIsModalOpen(true)}>
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
            onClick={() => {
              if (room.status !== "게임중" && room.players !== room.maxPlayers) {
                navigate(`/play/${room.id}`, { state: room });
              }
            }}
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
            <button onClick={handleCreateRoom}>확인</button>
            <button onClick={() => setIsModalOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
