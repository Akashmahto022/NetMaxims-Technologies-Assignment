import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mt-4 flex flex-wrap justify-center items-center">
      <div className="gap-2">
        <Link to={"/signup"}>
          <button className="mx-2 w-24 bg-blue-700 rounded-md p-2 text-white font-bold">
            SignUp
          </button>
        </Link>
        <Link to={"/login"}>
          <button className="mx-2 w-24 bg-blue-700 rounded-md p-2 text-white font-bold">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
