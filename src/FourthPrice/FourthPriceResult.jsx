import React, { useEffect, useState } from "react";
import SlotMechine from "../slotMechine/SlotMechine";
const audio = new Audio(
  require("../../src/assets/bicycle-wheel-spinning-49716-[AudioTrimmer.com].mp3")
);

const FourthPriceResult = ({ setLiveDraw, resultData, setPrizePosition }) => {

  console.log("fourth_data", resultData)
  useEffect(() => {
    setLiveDraw(true);
    setPrizePosition("4th")
  }, [setLiveDraw]);

  useEffect(() => {
    audio.play();
    const stopAudio = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 9500);

    return () => {
      clearTimeout(stopAudio);
      audio.pause();
    };
  }, []);

  return (
    <div className="fourth_result">
      <div className="bg-black h-[77vh] border-l-2 ">
        <div className="fourth_inner">
          {resultData &&
            resultData.map((endval, index) => {
              return (
                <div className="slot_machines_fourth" key={index}>
                  <SlotMechine
                    duration={10}
                    endNumbers={endval}
                    setvalueStart
                    rotate
                    fourth={true}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FourthPriceResult;
