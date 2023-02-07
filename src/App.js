import React, { useEffect, useState } from "react";
import {
  getGithubUser,
  getProfile,
  postLikeGithubUser,
  postRequestPin,
  getGithubUsers,
  postValidatePin,
} from "./api/index";
import "./App.scss";
import MainScreen from "./MainScreen";

function App() {
  useEffect(() => {
    // getGithubUser("hexhad").then((e) => console.log(e));
    // getProfile().then((e) => console.log(e));
    // postLikeGithubUser("1234567898", "1").then((e) => console.log(e));

    // getGithubUsers(1, 10, "", "").then((e) => console.log(e));

    // localStorage.setItem("mob",JSON.stringify(12345));
    // localStorage.setItem("mobileNo",JSON.stringify(12345));

    let hex = localStorage.getItem("mobileNo");
    if (!!hex) {
      // setLogin(false);
    }
    console.log("++++++", hex);
  }, []);

  async function otpRequestHandle() {
    if (!showOtp) {
      postRequestPin(mobileNumber).then((e) => setShowOtp(true));
    } else {
      postValidatePin(otp, mobileNumber).then((e) => {
        localStorage.setItem("mobileNo", JSON.stringify(mobileNumber));
        setLogin(false);
      });
    }
  }

  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, seOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [login, setLogin] = useState(true);
  return (
    <>
      {login ? (
        <div className="App">
          <div className="input-wrapper">
            <input
              inputMode="numeric"
              placeholder="Enter your number "
              value={mobileNumber}
              onChange={e=>setMobileNumber(e.target.value)}
            />
          </div>
          {showOtp ? (
            <div className="input-wrapper">
              <input
                inputMode="numeric"
                placeholder="Enter OTP"
                value={otp}
                onChange={e=>seOtp(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <p>Enter mobile number with country code</p>
            </div>
          )}

          <div className="btn-wrapper">
            <button onClick={otpRequestHandle}>
              <span>{showOtp?"Validate OTP":"Request OTP"}</span>
            </button>
          </div>
        </div>
      ) : (
        <MainScreen/>
      )}
    </>
  );
}

export default App;
