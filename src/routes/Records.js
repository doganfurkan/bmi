import React, { useState } from "react";

export default function Records() {
  const [myRecords, setMyRecords] = useState(
    localStorage.getItem("records") ? localStorage.getItem("records") : ""
  );
  return (
    <>
      {localStorage.getItem("records") ? (
        <>
          <div id="recordTable">
            <div id="recordTHead">
              <div id="recordTHeadRow">
                <div className="recordTHead">Action</div>
                <div className="recordTHead">Date</div>
                <div className="recordTHead">Gender</div>
                <div className="recordTHead">Height</div>
                <div className="recordTHead">Weight</div>
                <div className="recordTHead">Score</div>
              </div>
            </div>

            <div id="recordTBody">
              {JSON.parse(myRecords).map((item, key) => {
                return (
                  <div className="recordTr" key={key}>
                    <div className="recordTd">
                      <span
                        onClick={() => {
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
                              console.log(records);
                              console.log(wantedRecord);
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
                          }
                        }}
                      >
                        Delete
                      </span>
                    </div>
                    <div className="recordTd">{item.date}</div>
                    <div className="recordTd">{item.gender}</div>
                    <div className="recordTd">{item.height}</div>
                    <div className="recordTd">{item.weight}</div>
                    <div className="recordTd">{item.score}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            className="recordButton"
            onClick={() => {
              if (
                window.confirm("Do you want to delete all the records") === true
              ) {
                localStorage.removeItem("records");
                setMyRecords("");
              }
            }}
          >
            Delete All
          </button>
        </>
      ) : (
        <div style={{ color: "var(--textColor)" }}>
          You don't have any BMI records
        </div>
      )}
    </>
  );
}
