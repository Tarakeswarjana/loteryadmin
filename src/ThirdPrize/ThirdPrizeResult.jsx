import React, { useEffect } from "react";
import SlotMechine from "../slotMechine/SlotMechine";

const ThirdPrizeResult = ({setLiveDraw}) => {
  const results = [
    79856, 12489, 98758, 58569, 21548, 25896, 12548, 45612, 32569, 86531,
  ];

  useEffect(() => {
    setLiveDraw(true);
  }, [setLiveDraw]);

  return (
    <div className="second_result">
      <div className="bg-black h-auto border-l-2 ">
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
  );
};

export default ThirdPrizeResult;
