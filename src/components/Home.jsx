import React, { useState } from "react";

const Home = () => {
  const [title, setTitle] = React.useState("");

  return (
    <div>
      <input
        className="p-2 border border-gray-300 rounded-xl mt-2"
        type="text"
        placeholder="enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default Home;
