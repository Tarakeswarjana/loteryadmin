import React, { useEffect, useState } from "react";
import SlotMechine from "../slotMechine/SlotMechine";
import ThirdPrizeHome from "../ThirdPrize/ThirdPrizeHome";
const audio = new Audio(require("../../src/assets/bicycle-wheel-spinning-49716-[AudioTrimmer.com].mp3"));

const SecoundPrizeResult = ({ setLiveDraw }) => {
  const [status, setStatus] = useState(true);
  const results = [
    79856, 12489, 98758, 58569, 21548, 25896, 12548, 45612, 32569, 86531,
  ];

  useEffect(() => {
    setLiveDraw(true);
  }, [setLiveDraw]);

  useEffect(() => {
    // Start playing the audio when the component mounts
    audio.play();

    // Stop the audio before the duration ends (e.g., duration is 10 seconds)
    const stopAudio = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Reset audio to start
    }, 9500); // Stop the audio at 9.5 seconds (or adjust as needed)

    const changeStatus = setTimeout(() => {
      setStatus(false);
    }, 16000);

    return () => {
      clearTimeout(stopAudio);
      clearTimeout(changeStatus);
      audio.pause(); // Ensure audio stops if component unmounts early
    };
  }, []);

  return status ? (
    <div className="second_result">
      <div className="bg-black h-[77vh] border-l-2 ">
        <div className="second_inner">
          {results &&
            results.map((endval, index) => {
              return (
                <div className="slot_machines" key={index}>
                  <SlotMechine
                    duration={10}
                    endNumbers={endval}
                    setvalueStart
                    rotate
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <ThirdPrizeHome setLiveDraw={setLiveDraw} />
  );
};

export default SecoundPrizeResult;
