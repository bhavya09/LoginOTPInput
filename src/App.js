import "./styles.css";
import { useEffect, useState } from "react";
import { useRef } from "react";

export default function App() {
  const emptyArr = ["", "", "", ""];
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyArr);
  const [missing, setMissing] = useState(emptyArr);
  const CODE = "1234";

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  const handleSubmit = () => {
    const missed = inputs
      .map((item, i) => {
        if (item === "") {
          return i;
        }
      })
      .filter((item) => item || item === 0);

    setMissing(missed);

    const userInput = inputs.join("");
    const isMatch = userInput === CODE;
    const msg = isMatch ? "Code is Valid" : "Code is not valid";
    alert(msg);
  };

  const handleInputChange = (e, index) => {
    const val = e.target.value;
    console.log(val, index);
    if (!Number(val)) {
      return;
    }

    if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
    }

    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs);
  };

  const handleOnKeyDown = (e, index) => {
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = "";
      setInputs(copyInputs);

      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text");
    console.log("paste Data ", data);
    if (!Number(data) || data.length !== inputs.length) return;

    const pasteCode = data.split("");
    setInputs(pasteCode);

    refs[inputs.length - 1].current.focus();
  };

  return (
    <div className="App">
      <h1>Two-factor code input</h1>
      <div>
        {emptyArr.map((item, i) => {
          return (
            <input
              value={inputs[i]}
              key={i}
              ref={refs[i]}
              type="text"
              maxLength="1"
              onPaste={handlePaste}
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleOnKeyDown(e, i)}
              className={missing.includes(i) ? "error" : ""}
            />
          );
        })}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
