import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Main.css";

export const Main = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const roomsPerPage = 6; // 한 페이지에 표시할 방 개수

  const rooms = [
    { id: 1, name: "궯궯궯궯궯궯궯궯궯궯", players: 4, maxPlayers: 4, status: "게임중", problems: 15 },
    { id: 2, name: "방제1", players: 1, maxPlayers: 4, status: "대기중", problems: 5 },
    { id: 3, name: "방제2", players: 2, maxPlayers: 4, status: "대기중", problems: 10 },
    { id: 4, name: "방제3", players: 1, maxPlayers: 4, status: "대기중", problems: 10 },
    { id: 5, name: "방제4", players: 3, maxPlayers: 4, status: "게임중", problems: 10 },
    { id: 6, name: "방제5", players: 4, maxPlayers: 4, status: "대기중", problems: 15 },
    { id: 7, name: "방제6", players: 3, maxPlayers: 4, status: "게임중", problems: 10 },
    { id: 8, name: "방제7", players: 1, maxPlayers: 4, status: "대기중", problems: 15 },
  ];

  // 총 페이지 수 계산
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  // 현재 페이지에 표시할 방 목록
  const displayedRooms = rooms.slice(
    (currentPage - 1) * roomsPerPage,
    currentPage * roomsPerPage
  );

  // 페이지네이션 버튼 클릭 시 페이지 변경
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

  return (
    <div className="main-container">
      <h1 className="main-logo">
        <img src="/logo.svg" alt="Emblem XI Logo" className="logo-img" />
      </h1>

      <div className="button-container">
        <button className="create-room-btn">방 만들기</button>

        <div className="single-play-container" ref={dropdownRef}>
          <button
            className="single-play-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
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

      {/* 방 목록 표시 */}
      <div className="room-list">
        {displayedRooms.map((room) => (
          <div
            key={room.id}
            className={`room-card ${room.status === "게임중" || room.players === room.maxPlayers ? "disabled" : ""}`}
            onClick={() => {
              if (room.status !== "게임중" && room.players !== room.maxPlayers) {
                navigate(`/play/${room.id}`);
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

      {/* 페이지네이션 버튼 */}
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
    </div>
  );
};

export default Main;
