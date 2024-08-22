import React from 'react'

const FourthPriceResult = ({ setLiveDraw }) => {
    const [status, setStatus] = useState(true);
    const results = [
        7985, 1248, 9875, 5856, 2154, 2589, 1254, 4561, 3256, 8653,
        1185, 1048, 9375, 5056, 7154, 3589, 9254, 8561, 1256, 5653,
    ];
    const results1 = [
        7985, 1248, 9875, 5856, 2154, 2589, 1254, 4561, 3256, 8653,
        1185, 1048, 9375, 5056, 7154, 3589, 9254, 8561, 1256, 5653,
    ];
    const results2 = [
        7085, 1048, 4875, 7856, 9154, 2389, 5254, 3561, 6256, 9653,
        8185, 9048, 6375, 5056, 2154, 3389, 9554, 6561, 1956, 8653,
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
        }, 16000);

        return () => {
            clearTimeout(stopAudio);
            clearTimeout(changeStatus);
            audio.pause();
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
}

export default FourthPriceResult
