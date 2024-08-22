import React, { useEffect } from "react";
import SlotMechine from "../slotMechine/SlotMechine";
import FourthPrizeHome from "../FourthPrice/FourthPrizeHome";
const audio = new Audio(require("../../src/assets/bicycle-wheel-spinning-49716-[AudioTrimmer.com].mp3"));

const ThirdPrizeResult = ({setLiveDraw}) => {
  const [status, setStatus] = useState(true);
  const results = [
    79856, 12489, 98758, 58569, 21548, 25896, 12548, 45612, 32569, 86531,
  ];

  useEffect(() => {
    setLiveDraw(true);
  }, [setLiveDraw]);

  useEffect(() => {
    audio.play();

    const stopAudio = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; 
    }, 9500); 

    const changeStatus = setTimeout(() => {
      setStatus(false);
    }, 11000);

    return () => {
      clearTimeout(stopAudio);
      clearTimeout(changeStatus);
      audio.pause(); 
    };
  }, []);

  return status ? (
    <div className="second_result">
      <div className="bg-black h-[77vh] border-l-2 ">
        <div className="third_inner">
          {results &&
            results.map((endval, index) => {
              return (
                <div className="slot_machines_third" key={index}>
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
    <FourthPrizeHome setLiveDraw={setLiveDraw} />
  )
};

export default ThirdPrizeResult;
