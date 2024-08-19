import React, { useEffect, useState } from "react";
import "./Main.css";
import middle from "../images/MIDDLE.png";
import first from "../images/first.png";
import logo from "../images/logo.jpg";
import CustomWheel2 from "../customwheel2/CustomWheel2";
// const beepSound = require('../assets/piep-33489-[AudioTrimmer.com].mp3')

const Main = () => {
  const [count, setCount] = useState(10);
  const [status, setStatus] = useState(true);
  console.log("status", count, status);
  const [color, setColor] = useState(false);
  const [fallingText, setfallingText] = useState(false);
  const [blink, setBlink] = useState(false);
  const [liveDraw, setLiveDraw] = useState(false);
  console.log("liveDraw", liveDraw);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 0) {
          if (prevCount === 5) {

            // var sound = new Audio(beepSound);
            // sound.play();

          }
          return prevCount - 1;
        } else {
          clearInterval(interval);
          setStatus(false);
          return 0;
        }
      });
    }, 200);
    // }, 1500);

    if (count === 0) {
      const numberBlink = setTimeout(() => {
        setBlink(true);
      }, 1800);

      const changeState = setTimeout(() => {
        setStatus(false);
      }, 1800);

      return () => {
        clearTimeout(numberBlink);
        clearTimeout(changeState);
      };
    }

    const fallingText = setTimeout(() => {
      setfallingText(true);
    }, 7000);

    const changeColor = setTimeout(() => {
      setColor(true);
    }, 12500);

    const Blink = setTimeout(() => {
      setBlink(true);
    }, 13000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallingText);
      clearTimeout(changeColor);
      clearTimeout(Blink);
    };
  }, [count]);

  // Format count to always display two digits
  const formattedCount = String(count).padStart(2, "0");

  return (
    <div className="main_div">
      {/* top */}
      <div className="flex justify-around pt-4">
        <div className="pt-1 pb-1 flex justify-center align-center bg-black rounded rounded-full w-72 h-[56px]">
          <p className="w-full text-center bg-yellow-400 text-black rounded rounded-full font-bold">
            PLAY LIVE DRAW ON <span className="text-red-700">YOUTUBE</span>{" "}
            <br />
            HONG KONG LOTTERIES{" "}
          </p>
        </div>
        <div className="">
          <img className="lottery" src={middle} alt="middle" />
        </div>
        <div className="pt-1 pb-1 flex justify-center align-center bg-black rounded rounded-full w-56 h-[56px]">
          <p className="w-full flex justify-center items-center bg-yellow-400 text-black rounded rounded-full font-bold">
            LIVE FROM HONG KONG
          </p>
        </div>
      </div>
      {/* middle */}
      <div className="mt-4 w-[96%] h-[665px] mx-auto flex justify-between ">
        <div className="w-[50px] h-[100%] flex justify-between items-center mr-2 ">
          <div className="w-full h-[90%] flex flex-col justify-evenly items-center text-black text-5xl rounded rounded-full font-bold">
            <p className="pxwell font-extrabold">P</p>
            <p className="pxwell font-extrabold">X</p>
            <p className="pxwell font-extrabold">W</p>
            <p className="pxwell font-extrabold">E</p>
            <p className="pxwell font-extrabold">L</p>
            <p className="pxwell font-extrabold">L</p>
          </div>
        </div>
        {liveDraw && (
          <div className="w-[50px] h-[100%] flex justify-between items-center mr-2 ml-8">
            <div className="w-full h-[90%] flex flex-col justify-evenly items-center text-black text-5xl rounded rounded-full font-bold">
              <p className="pxwell font-extrabold">L</p>
              <p className="pxwell font-extrabold">I</p>
              <p className="pxwell font-extrabold">V</p>
              <p className="pxwell font-extrabold">E</p>
              <p className="pxwell font-extrabold">D</p>
              <p className="pxwell font-extrabold">R</p>
              <p className="pxwell font-extrabold">A</p>
              <p className="pxwell font-extrabold">W</p>
            </div>
          </div>
        )}
        {status ? (
          <div className="w-9/12 border border-2 h-[100%] bg-black text-white p-8 text-center overflow-hidden">
            <div className="typing_text_main_div">
              <ul className="dynamik_text">
                <li>
                  <span>HONGKONG LOTTERIES</span>
                </li>
              </ul>
            </div>
            {/* {fallingText && ( */}
               <div className={`fall_blink_text `}>
               <h4 className="text-9xl font-extrabold mt-8 mb-8 blink_text ">
                 <div
                   className={`word  ${color ? "colorChange" : ""} ${
                     blink ? "blink" : ""
                   }  ${fallingText ? "block" : "hidden"}`}
                 >
                   <span>P</span>
                   <span>X</span>
                   <span>W</span>
                   <span>E</span>
                   <span>L</span>
                   <span>L</span>
                 </div>
               </h4>
             </div>
            {/* )} */}
            <div className="flex justify-center items-center mt-[35%]">
              <div className={`h-[81px] w-24 bg-white text-black text-7xl `}>
                <span
                  className={`${formattedCount === "00" ? (blink ? "blink" : "") : ""
                    }`}
                >
                  00
                </span>
              </div>
              <div
                className={`h-[81px] w-24 bg-white text-black text-7xl ml-2 `}
              >
                <span
                  className={`${formattedCount === "00" ? (blink ? "blink" : "") : ""
                    }`}
                >
                  {formattedCount}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[74vw] border border-2 h-[74vh] overflow-hidden relative">
            <CustomWheel2
              no={39}
              letter={"j"}
              digits={61754}
              rotate={true}
              setLiveDraw={setLiveDraw}
            />
          </div>
        )}

        <div className="curve w-2/12 bg-red-600 ml-1 flex flex-col justify-center items-center">
          <img src={first} className="h-16 w-16" alt="first" />
          <p className="text-teal-200 font-extrabold text-5xl">prize</p>
          <p className="prize font-bold text-3xl ">ON</p>
          <p className="prize font-bold text-3xl ">5</p>
          <p className="prize font-bold text-3xl ">DIGITS</p>
          <p className="prize font-bold text-3xl ">WITH</p>
          <p className="prize font-bold text-3xl ">SERIES</p>
        </div>
        <div className="w-[50px] h-[100%] flex justify-between items-center ml-2 ">
          <div className="w-full h-[90%] flex flex-col justify-evenly items-center text-black text-5xl rounded rounded-full font-bold">
            <p className="pxwell font-extrabold">P</p>
            <p className="pxwell font-extrabold">X</p>
            <p className="pxwell font-extrabold">W</p>
            <p className="pxwell font-extrabold">E</p>
            <p className="pxwell font-extrabold">L</p>
            <p className="pxwell font-extrabold">L</p>
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="flex justify-around pt-4">
        <div className="pt-1 pb-1 flex justify-center align-center bg-black rounded rounded-full w-64 h-12">
          <p className="w-full flex justify-center items-center bg-red-700 text-white rounded rounded-full font-bold">
            DRAW DATE - 11.08.2024
          </p>
        </div>
        <div className="">
          <img className="logo" src={logo} alt="middle" />
        </div>
        <div className="pt-1 pb-1 flex justify-center align-center bg-black rounded rounded-full w-56 h-12">
          <p className="w-full flex justify-center items-center bg-red-700 text-white rounded rounded-full font-bold">
            DRAW TIME - 10.00PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
