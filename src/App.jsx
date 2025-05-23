import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputs = useRef([]);
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      if (index === 0 || otp[index - 1] !== "") {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (index < otp.length - 1) {
          inputs.current[index + 1].focus();
        }
      }
    }
  };

  const handlekeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    if (otp.every((value) => value !== "")) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [otp]);
  return (
    <section className="App">
      <div className="otp-container">
        {otp.map((value, index) => (
          <input
            key={index}
            value={value}
            type="text"
            maxLength={1}
            inputMode="numeric"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handlekeyDown(e, index)}
            ref={(e) => (inputs.current[index] = e)}
            className={value ? "filled" : ""}
          />
        ))}
      </div>

      <div className="submitbtn">
        <button
          onClick={() => {
            setOtp(["", "", "", "", "", ""]);
            inputs.current[0].focus();
          }}
          disabled={isDisabled}
          style={{
            backgroundColor: isDisabled ? "#ccc" : "#007bff",
            color: isDisabled ? "#666" : "#fff",
            cursor: isDisabled ? "not-allowed" : "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default App;
