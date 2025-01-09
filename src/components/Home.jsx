import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update
      dispatch(updateToPastes(paste));
    } else {
      // create
      dispatch(addToPastes(paste));
    }

    // After Updation and Creation
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <>
      <div className="flex flex-row gap-6 place-content-between">
        <input
          className="p-2  border border-gray-300 rounded-xl mt-2 w-[66%] pl-4"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="p-2 border border-gray-300 rounded-xl mt-2"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div>
        <textarea
          className="rounded-2xl p-2 border border-gray-300 mt-8 min-w-[500px] "
          value={value}
          placeholder="Enter your paste here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </>
  );
};

export default Home;
