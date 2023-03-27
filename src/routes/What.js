import React from "react";

export default function What() {
  return (
    <div>
      <h2 className="pageHeader">What is the body mass index (BMI)?</h2>
      <div className="pageContent">
        <b>
          The body mass index (BMI) is a measure that uses your height and
          weight to work out if your weight is healthy.
        </b>
        <br />
        <br /> The BMI calculation divides an adult's weight in kilograms by
        their height in metres squared. For example, A BMI of 25 means 25kg/m2.{" "}
        <br />
        <br /> <h3>BMI ranges</h3> <br /> For most adults, an ideal BMI is in
        the 18.5 to 24.9 range. <br />
        <br /> For children and young people aged 2 to 18, the BMI calculation
        takes into account age and gender as well as height and weight. <br />
        <br /> If your BMI is: <br /><br />
        <ul>
          <li>below 18.5 – you're in the underweight range</li>
          <li>between 18.5 and 24.9 – you're in the healthy weight range</li>
          <li>between 25 and 29.9 – you're in the overweight range</li>
          <li>30 or over – you're in the obese range</li>
        </ul>
      </div>
      <br /><br />
      <a className="whatLink" target="_blank" rel="noreferrer" href="https://www.nhs.uk/common-health-questions/lifestyle/what-is-the-body-mass-index-bmi/">Source</a>
    </div>
  );
}
