import React, { useEffect, useState } from "react";
import SlotMechine from "../slotMechine/SlotMechine";
import ThirdPrizeHome from "../ThirdPrize/ThirdPrizeHome";

const SecoundPrizeResult = ({ setLiveDraw }) => {
  const [status, setStatus] = useState(true);
  console.log("sta33333tus", status)
  const results = [
    79856, 12489, 98758, 58569, 21548, 25896, 12548, 45612, 32569, 86531,
  ];

  useEffect(() => {
    setLiveDraw(true);
  }, [setLiveDraw]);

  useEffect(() => {
    const changeStatus = setTimeout(() => {
    //   setStatus(false);
    }, 16000);

    return () => clearTimeout(changeStatus);
  }, []);

  return status ? (
    <div className="second_result">
      <div className="bg-black h-auto border-l-2 ">
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
    <ThirdPrizeHome setLiveDraw={setLiveDraw}/>
  );
};

export default SecoundPrizeResult;
