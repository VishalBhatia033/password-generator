import { useState, useCallback, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-[100vh]">
      <div className="flex flex-col gap-6">
        <h1 className="text-center text-[rgb(91,178,84)] font-bold text-6xl">
          Random password generator
        </h1>
        <p className="text-center text-xl">
          Generate strong, random, and unique passwords with the click of a
          button
        </p>
      </div>
      <div className="w-[65%]  mx-auto rounded-lg px-4 py-4  flex flex-col gap-5 ">
        <h1 className="text-center my-3 text-2xl font-bold flex items-center justify-center gap-3">
          <FontAwesomeIcon
            className="text-[#5BB254] text-3xl"
            icon={faCircleCheck}
          />{" "}
          Strong
        </h1>
        <div className="flex overflow-hidden mb-4 gap-3">
          <input
            type="text"
            value={password}
            className="outline-none w-[80%] py-6  px-6 text-2xl  bg-[#5BB254] rounded text-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="text-2xl w-[20%] text-gray-700 outline-none bg-white  px-3  border-2 border-gray-200 rounded"
          >
            Copy
          </button>
        </div>
        <div className="flex justify-center items-center text-[1.2rem] gap-6">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer block text-sm font-medium text-gray-900 dark:text-white"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">0-9</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="font-bold">
              !@#$%^&
            </label>
          </div>
          <div className="flex justify-center items-center w-[30%]  text-[0.6rem]">
            <p>This tool uses JavaScript to generate passwords on your device only (client side).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
