import React, { useEffect, useState } from "react";
import SecoundPrizeResult from "./SecoundPrizeResult";

const SecoundPrizeHome = ({setLiveDraw}) => {
  const [textType, setTextType] = useState(false);
  const [textFall, setTextFall] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [blink, setBlink] = useState(false);
  const [bottomText, setBottomText] = useState(false);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const typeText = setTimeout(() => {
      setTextType(true);
    }, 1000);

    const lineShow = setInterval(() => {
      setShowLine(true);
    }, 3000);

    const falltext = setTimeout(() => {
      setTextFall(true);
    }, 3000);

    const Blink = setTimeout(() => {
      setBlink(true);
    }, 5800);

    const bottomtextType = setTimeout(() => {
      setBottomText(true);
    }, 6500);

    const changeStatus = setTimeout(() => {
      setStatus(false)
    }, 15000);

    return () => {
      clearTimeout(typeText);
      clearTimeout(falltext);
      clearInterval(lineShow);
      clearTimeout(Blink);
      clearTimeout(bottomtextType);
      clearTimeout(changeStatus);
    };
  }, []);

  return status ? (
    <div className="bg-black fixed inset-0">
      <dib className="flex flex-col justify-center items-center w-[52%] h-[100vh] mx-auto text-center second_main_div">
        <div className="typing_text_2_main_div">
          <ul className={textType ? "dynamik_text2" : "hidden"}>
            <li>
              <span>PXWELL</span>
            </li>
          </ul>
        </div>
        <div className={showLine ? "line" : ""}></div>
        <div className={textFall ? "nextDraw" : ""}>
          <span>LIVE NEXT DRAW</span>
        </div>
        <div className={`secoundPrizeNo ${blink ? "blink" : "hidden"}`}>
          <span className="number">2</span>
          <span className="nd">nd</span> <span>Prize</span>
        </div>
        <div className="bottom_text">
          <ul className={bottomText ? "dynamik_text_bottom" : "hidden"}>
            <li>
              <span>ON 5 DIGITS WITH 10 TIMES</span>
            </li>
          </ul>
        </div>
      </dib>
    </div>
  ) : (
    <SecoundPrizeResult setLiveDraw={setLiveDraw}  />
  )
};

export default SecoundPrizeHome;
