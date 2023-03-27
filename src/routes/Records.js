import React from "react";

export default function Records() {
  return (
    <>
      {localStorage.getItem("records") ? (
        <>
          <div id="recordTable">
            <div id="recordTHead">
              <div id="recordTHeadRow">
                <div className="recordTHead">Id</div>
                <div className="recordTHead">Date</div>
                <div className="recordTHead">Gender</div>
                <div className="recordTHead">Height</div>
                <div className="recordTHead">Weight</div>
                <div className="recordTHead">Score</div>
              </div>
            </div>

            <div id="recordTBody">
              {JSON.parse(localStorage.getItem("records")).map((item, key) => {
                return (
                  <div className="recordTr" key={key}>
                    <div className="recordTd">{item.id}</div>
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
          <button className="recordButton" onClick={() => {
            let idWanted = window.prompt("Enter the id of the record you want to delete");
            if(idWanted){
              let records = JSON.parse(localStorage.getItem("records"));
              let wantedRecord = records.findIndex((item) => item.id === idWanted);
              if(wantedRecord >= 0){
                console.log(records)
                console.log(wantedRecord)
                records.splice(wantedRecord,1)
              }
              localStorage.setItem("records",JSON.stringify(records));
              window.location.reload();
            }
          }}>Delete With Id</button>
          <button className="recordButton" onClick={() => {
            if(window.confirm("Do you want to delete all the records") === true){
              localStorage.removeItem("records");
              window.location.reload();
            }
          }}>Delete All</button>
        </>
      ) : (
        <div style={{ color: "var(--textColor)" }}>
          You don't have any BMI records
        </div>
      )}
    </>
  );
}
