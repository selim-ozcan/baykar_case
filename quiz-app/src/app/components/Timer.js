import {useState, useEffect} from "react";

export default function Timer({currentQuestion, setCanChooseAnswer, onTimeOut}) {
    const [remainingTime, setRemainingTime] = useState(30);
		const [interval, setInterv] = useState(null);

    useEffect(() => {
			if (interval) {
				setRemainingTime(30)
				clearInterval(interval)
				setCanChooseAnswer(false)
			}
      setInterv(setInterval(() => { 
          setRemainingTime(prev => prev - 1)         
      }, 1000))
    }, [currentQuestion])


		useEffect(() => {
			if (remainingTime <= 0) {
				onTimeOut(() => {
					setRemainingTime(30)
					clearInterval(interval);
				})
			}

			if (remainingTime > 0 && remainingTime < 29) {
				setCanChooseAnswer(true)
			}
		}, [remainingTime])
		

	
    return <div className="w-full bg-gray-300 rounded-full h-2.5 mb-12 dark:bg-gray-700 ">
  	<div className={`bg-gradient-to-b ${remainingTime > 8 ? "from-teal-400 to-green-400": "from-red-500 to-red-600"} h-2.5 rounded-full border  border-green-700`} style={{width: `${100 * (remainingTime / 30)}%`}}></div>
		</div>
		

}