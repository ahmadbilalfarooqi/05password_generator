import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  // all states define here
  const [lenght, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useref hook store in variable
  const passwordRef = useRef(null);

  // useCallback hook fire
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [lenght, numberAllowed, charAllowed, setPassword]);

  // usecallback hook again fire for copyclipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 40);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useEffect hook fire
  useEffect(() => {
    passwordGenerator();
  }, [lenght, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full sm:max-w-xl max-w-xs mx-auto shadow-xl rounded-xl px-4 py-2 bg-gray-900 text-white mt-10">
        <h1 className="text-xl md:text-4xl text-center font-bold text-green-500 my-4">
          Password Generator
        </h1>

        {/* first input for text password */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full px-3 py-1 outline-none text-black/70 font-bold rounded-sm"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          {/* copy button for text */}
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-500 hover:bg-blue-700 text-white px-3 py-0.7 shrink-0 hover:scale-110 duration-300 "
          >
            copy
          </button>
        </div>

        {/* second input for lenght password */}
        <div className="flex flex-col md:flex-row text-sm gap-x-2 space-y-2 md:space-y-0">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={35}
              value={lenght}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-yellow-400">Length: {lenght}</label>
          </div>

          {/* input for checkbox numbers */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-yellow-500">
              Numbers
            </label>
          </div>

          {/* input for checkbox character */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="text-yellow-500">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
