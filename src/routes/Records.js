import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Records() {
  const [myRecords, setMyRecords] = useState(
    localStorage.getItem("records") ? localStorage.getItem("records") : ""
  );
  const [scores, setScores] = useState();
  const [sort,setSort] = useState("newest")

  useEffect(() => {
    axios.get("scores.json").then((res) => {
      setScores(res.data);
    });
  }, []);

  useEffect(() => {
    Array.from(document.getElementsByClassName("recordScore")).forEach(
      (item) => {
        if (scores !== undefined) {
          console.log(Number(item.innerHTML));
          console.log(scores);
          let skor = () =>
            scores.find(
              (element) =>
                element.min <= Number(item.innerHTML) &&
                element.max >= Number(item.innerHTML)
            );
          item.classList.add(skor().tag.toLowerCase());
        }
      }
    );
  }, [scores]);

  return (
    <>
      {localStorage.getItem("records") ? (
        <>
          <div id="recordActions">
            <div className="specialSelect">
              <select name="sort" id="sort" onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
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
            <button
              className="recordButton"
              onClick={() => {
                if (
                  window.confirm("Do you want to delete all the records?") ===
                  true
                ) {
                  localStorage.removeItem("records");
                  setMyRecords("");
                }
              }}
            >
              Delete All
            </button>
          </div>
          <div id="recordContainer" className={sort}>
            {JSON.parse(myRecords).map((item, key) => {
              return (
                <div className="record" key={key}>
                  <div
                    className="recordHeader"
                    onClick={(e) => {
                      e.currentTarget.classList.toggle("openRecord");
                    }}
                  >
                    <div className="recordTitle">
                      <div className={`recordScore`}>{item.score}</div>
                      <span className="dotBetween">•</span>
                      <div className="recordDate">{item.date}</div>
                    </div>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="4"
                      viewBox="0 0 24 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="1 1 12 11 23 1"></polyline>
                    </svg>
                  </div>
                  <div className="recordBody">
                    <div className="recordLine">
                      <span className="lineHeader">Gender</span>
                      <span className="lineContent">{item.gender}</span>
                    </div>
                    <div className="recordLine">
                      <span className="lineHeader">Height</span>
                      <span className="lineContent">{item.height} cm</span>
                    </div>
                    <div className="recordLine">
                      <span className="lineHeader">Weight</span>
                      <span className="lineContent">{item.weight} kg</span>
                    </div>
                    <div
                      className="deleteButton"
                      onClick={(e) => {
                        let idWanted = item.id;
                        if (
                          window.confirm("Do you want to delete this record?")
                        ) {
                          let records = JSON.parse(
                            localStorage.getItem("records")
                          );
                          let wantedRecord = records.findIndex(
                            (item) => item.id === idWanted
                          );
                          if (wantedRecord >= 0) {
                            records.splice(wantedRecord, 1);
                          } else {
                            alert("There is no record with that id");
                          }
                          if (records.length !== 0) {
                            localStorage.setItem(
                              "records",
                              JSON.stringify(records)
                            );
                            setMyRecords(JSON.stringify(records));
                          } else {
                            localStorage.removeItem("records");
                            setMyRecords("");
                          }

                          e.target.parentElement.parentElement
                            .querySelector(".recordHeader")
                            .classList.remove("openRecord");
                        }
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ color: "var(--textColor)" }}>
          You don't have any BMI records
        </div>
      )}
    </>
  );
}
