"use client"

import React, {useState, useEffect, useMemo, useCallback} from "react";
import Timer from "./components/Timer";

const optionLetters = ["A", "B", "C", "D"];

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [canChooseAnswer, setCanChooseAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then(questions => {
        setQuestions(questions);
        setCurrentQuestion(0)
      })      
  }, []);

  useEffect(() => {
    const newOptions = [];
    console.log(questions?.[currentQuestion]?.body);
    for (let i = 0; i < 4; i++)
      newOptions.push(questions?.[currentQuestion]?.body.split(" ")[i]);
    setOptions(newOptions);
    
  }
  , [currentQuestion])

  return (
    questions.length && 
    <div className="flex h-[100vh] p-20 justify-center bg-[#6196A6]/75">
      <div className="flex flex-col justify-center w-[60vw] bg-gradient-to-b from-[#B7C9F2]/50 to-[#9195F6]/50 rounded-lg drop-shadow-2xl shadow-dark-blue text-black p-20 border grow-0">
        
        {!quizStarted ?  
        <button className="bg-teal-400 rounded-xl border-2 border-teal-700 text-gray-100 hover:scale-105 px-4 py-2 hover:drop-shadow-xl w-48 self-center text-xl" onClick={() => setQuizStarted(true)}>
          Start Quiz
        </button>: 
        answers.length < 10 ? <div>
          <div><Timer currentQuestion={currentQuestion} setCanChooseAnswer={setCanChooseAnswer} onTimeOut={(resetTimer) => {
            setCurrentQuestion(prev => prev + 1)
            setCanChooseAnswer(false)
            setChosenAnswer(null)
            setAnswers(prev => [...prev, {question: currentQuestion, chosenAnswer}])
            resetTimer()     
          }}></Timer></div>
          
          <div className="font-extrabold text-2xl my-8 border-b border-black">
            Question {currentQuestion + 1}/10
          </div>
          <div className="font-extrabold first-letter:capitalize my-8">{questions[currentQuestion].body} ?</div>

          <div className="mt-12">
            {optionLetters.map((letter, index) => <div key={index} className={`mb-4 drop-shadow-xl border border-black rounded-lg p-2 pl-6 hover:cursor-pointer  bg-gradient-to-l ${!canChooseAnswer ? "from-gray-500 to-gray-500 text-white hover:cursor-default": chosenAnswer !== index ? "from-[#FEFBF6]/70 to-[#FEFBF6]/70" : "from-teal-300/80 to-teal-200/80 scale-105 text-lg"}`}
            onClick={() => {
              if (canChooseAnswer)
                setChosenAnswer(index)
            }}> <span className="font-bold">{letter}</span> - {options[index]
            }</div>)}
          </div>
          <div className="flex justify-end mt-12">
            <button disabled={!canChooseAnswer} className={`bg-teal-400 px-4 py-2 rounded-lg border-2  border-teal-700 text-gray-100 hover:scale-105 hover:drop-shadow-xl disabled:bg-gray-400 disabled:border-gray-700 disabled:hover:scale-100`} onClick={() => {
              setCurrentQuestion(prev => prev + 1)
              setChosenAnswer(null);
              setAnswers(prev => [...prev, {question: currentQuestion, chosenAnswer}])
            }}>Next Question</button>
          </div>
        </div>:
        <div className="w-[50vw] flex flex-col"> 
          <h2 className="font-bold my-4 -mt-2 text-center">Your assessment is submitted, you can leave the page.</h2>
          <h1 className="font-extrabold text-4xl my-8 text-center">Your answers: </h1>
          {answers.map((answer, index) => <div className="w-[80%] flex self-center justify-around bg-teal-400/75 px-4 py-2 mb-4 rounded-xl drop-shadow-xl" key={index}>
            <span className="font-bold">Question: {answer.question + 1}</span>
            <span>Your answer: <span className="font-bold">{answer.chosenAnswer === null ? "-": optionLetters.filter((_, index) => index === answer.chosenAnswer).join("")}</span></span> 
          </div>)}
        </div>
        } 
      </div>
    </div>  
  );
}
