import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="bg">
      <h1 className="logo">
        Emblem XI <span className="ml-2">⚽</span>
      </h1>
      <div className="button">
        <button className="room">방만들기</button>
        <button className="single-play" onClick={() => navigate("/Play")}>혼자놀기</button>
      </div>
      <div className="room-list">
        {[{ name: "고수만", status: "게임중", count: 15 }, 
          { name: "방제", status: "대기중", count: 5 },
          { name: "방제", status: "대기중", count: 10 },
          { name: "방제", status: "대기중", count: 20 },
          { name: "방제", status: "대기중", count: 20 },
          { name: "방제", status: "대기중", count: 15 }].map((room, index) => (
          <div key={index} className="bg-gray-600 text-white p-5 rounded-lg w-60">
            <h2 className="text-lg font-bold">{room.name}</h2>
            <p>{room.status}</p>
            <p>{room.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
/*
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-cover bg-center flex flex-col items-center p-5" style={{ backgroundImage: "url('/mnt/data/메인.png')" }}>
      <h1 className="text-white text-3xl font-bold flex items-center">
        Emblem XI <span className="ml-2">⚽</span>
      </h1>
      <div className="mt-5 flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">방만들기</button>
        <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg" onClick={() => navigate("/Play")}>혼자놀기</button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10">
        {[{ name: "고수만", status: "게임중", count: 15 }, 
          { name: "방제", status: "대기중", count: 5 },
          { name: "방제", status: "대기중", count: 10 },
          { name: "방제", status: "대기중", count: 20 },
          { name: "방제", status: "대기중", count: 20 },
          { name: "방제", status: "대기중", count: 15 }].map((room, index) => (
          <div key={index} className="bg-gray-600 text-white p-5 rounded-lg w-60">
            <h2 className="text-lg font-bold">{room.name}</h2>
            <p>{room.status}</p>
            <p>{room.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 아마 클래스 이름이 css 일 듯.
*/ 