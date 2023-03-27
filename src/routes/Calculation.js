import React, { useEffect, useRef, useState } from "react";
import "./routes.css";
import axios from "axios"
import { nanoid } from 'nanoid'

export default function Calculation() {
  const [height, setHeight] = useState(150);
  const [weight, setWeight] = useState(60);
  const [score, setScore] = useState(0);
  const [myScore, setMyScore] = useState({className:"healthy"});
  const [scores,setScores] = useState([]);
  var initial = useRef(true);
  const heightMin = 50;
  const heightMax = 260;
  const weightMin = 1;
  const weightMax = 300;

  useEffect(() => {
    axios.get("scores.json")
    .then((res) => {
      setScores(res.data)
    })
  },[])

  useEffect(() => {
    let heightPercentage =
      ((height - heightMin) * 100) / (heightMax - heightMin);
    document.getElementById(
      "height"
    ).style.background = `linear-gradient(to right,var(--rangeColor) 0% ${heightPercentage}%, var(--inputBg) ${heightPercentage}% 100%)`;

    let weightPercentage =
      ((weight - weightMin) * 100) / (weightMax - weightMin);
    document.getElementById(
      "weight"
    ).style.background = `linear-gradient(to right,var(--rangeColor) 0% ${weightPercentage}%, var(--inputBg) ${weightPercentage}% 100%)`;


    let skor = () => scores.find((item) => ((item.min <= Number(score)) && (item.max >= Number(score))));
    if(!initial.current){setMyScore(skor)};

    initial.current = false;



  }, [height, weight,score,scores]);



  const calculate = (e) => {
    e.preventDefault();
    let heightInMeters = height / 100;
    setScore(weight / (heightInMeters * heightInMeters));
    document.getElementById("score").classList.remove("hidden");
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let gender = document.getElementById("gender").value;
    let myRecord = {id:nanoid(10),date: `${day}/${month}/${year}`,gender:gender,height:height,weight:weight,score:(weight / (heightInMeters * heightInMeters)).toFixed(1)};

    if(localStorage.getItem("records")){
      let records = JSON.parse(localStorage.records); 
      records.push(myRecord)
      let write = JSON.stringify(records);
      localStorage.setItem("records",write);
    }
    else{
      let myArray = [myRecord];
      let write = JSON.stringify(myArray);
      console.log(write);
      localStorage.setItem("records",write)
    }
  }

  return (
    <div id="calc">
      <form onSubmit={calculate}>
        <div>
          <label htmlFor="gender">Gender</label>
          <div id="specialSelect">
            <select name="gender" id="gender">
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="11 9 17 15 23 9"></polyline>
            </svg>
          </div>
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input
            type="range"
            className="range"
            step={1}
            min={heightMin}
            max={heightMax}
            name="height"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <div className="w-h">
            <input
              type="number"
              value={height}
              min={heightMin}
              max={heightMax}
              onChange={(e) => setHeight(e.target.value)}
            />{" "}
            cm
          </div>
        </div>
        <div>
          <label htmlFor="weight">Weight</label>
          <input
            type="range"
            className="range"
            step={1}
            min={1}
            max={300}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            name="weight"
            id="weight"
          />
          <div className="w-h">
            <input
              type="number"
              value={weight}
              min={weightMin}
              max={weightMax}
              onChange={(e) => setWeight(e.target.value)}
            />{" "}
            kg
          </div>
        </div>
        <button>Calculate</button>
      </form>

      <div id="score" className="hidden">
        <div id="scoreBoard" className={myScore.className ? myScore.className : "healthy"}>
          <span className="score">{score.toFixed(1)}</span>
          <span className="scoreTitle">{myScore.tag}</span>
        </div>

        <div id="scoreDesc">
          <div id="scoreDescHeader">
            <h2>{myScore.title}</h2>
          </div>
          <div id="scoreDescContent">
            {myScore.description}
            {myScore.descSource ? <div className="source"><a href={myScore.descSource} target="_blank" rel="noreferrer">Source</a></div> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
