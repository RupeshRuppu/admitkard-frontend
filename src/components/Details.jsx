import { HomeIcon } from "@heroicons/react/outline";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const Details = () => {
  const [userInfo, setUserInfo] = useState({});
  const naviagte = useNavigate();
  const emailRef = useRef("");

  const handleSubmit = async () => {
    if (emailRef.current.length === 0 || typeof emailRef.current === "object") {
      alert("email must not be empty.");
      return;
    }

    const response = await fetch(
      `http://localhost:3001/find-user/${emailRef.current}`
    );
    const user = await response.json();
    if (user.message != null) {
      setUserInfo(user.message);
      return;
    }
    setUserInfo(user[0]);
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <HomeIcon
        className="absolute top-10 left-10 w-7 h-7 cursor-pointer"
        onClick={() => {
          naviagte(-1);
        }}
      />
      <div className="w-screen h-60 p-10 flex justify-center items-center space-x-3">
        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          id="email"
          className="input"
          ref={emailRef}
          onChange={(e) => (emailRef.current = e.target.value)}
        />
        <button className="btn-blue tracking-widest" onClick={handleSubmit}>
          Fetch
        </button>
      </div>
      <div className="text-center p-10">
        {JSON.stringify(userInfo, undefined, 4)}
      </div>
    </div>
  );
};

export default Details;
