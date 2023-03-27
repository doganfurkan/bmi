import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ImGithub } from "react-icons/im";

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ? Number(localStorage.theme) : 0;
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const menuFunc = () => {
    if (!menuOpen) {
      document.getElementById("menu").style.transform = "translateY(100%)";
      document.getElementById("burgerTop").setAttribute("points", "0 0 24 24");
      document.getElementById("burgerBot").setAttribute("points", "0 24 24 0");
      document.getElementById("burgerMid").style.display = "none";
    }else{
      document.getElementById("menu").style.transform = "translateY(0)";
      document.getElementById("burgerTop").setAttribute("points", "0 5 24 5");
      document.getElementById("burgerBot").setAttribute("points", "0 19 24 19");
      document.getElementById("burgerMid").style.display = "block";
    }
    setMenuOpen(!menuOpen)
  };

  useEffect(() => {
    document.body.classList.remove(
      Array.from(document.body.classList).find(
        (item) => item.indexOf("theme") >= 0
      )
    );
    document.body.classList.add(`theme${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <aside>
      <div id="logo">
        <h1>BMI Calculator</h1>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="3"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            menuFunc();
          }}
        >
          <polyline id="burgerTop" points="0 5 24 5"></polyline>
          <polyline id="burgerMid" points="0 12 24 12"></polyline>
          <polyline id="burgerBot" points="0 19 24 19"></polyline>
        </svg>
      </div>
      <section id="menu">
        <nav>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={"/"}
          >
            Calculate{" "}
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
              <polyline points="17 18 23 12 17 6"></polyline>
            </svg>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={"whatisbmi"}
          >
            What is BMI{" "}
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
              <polyline points="17 18 23 12 17 6"></polyline>
            </svg>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={"records"}
          >
            Your Records{" "}
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
              <polyline points="17 18 23 12 17 6"></polyline>
            </svg>
          </NavLink>
          <div className="theme">
            Light Theme{" "}
            <label className="switch">
              <input
                aria-label="theme-changer"
                type="checkbox"
                onChange={() => {
                  setTheme((theme + 1) % 2);
                }}
                checked={theme}
              />
              <span className="mySwitch round"></span>
            </label>
          </div>
        </nav>
        <a
          id="githubLink"
          href="https://www.github.com/doganfurkan"
          target="_blank"
          rel="noreferrer"
        >
          <div id="github">
            <div>
              <ImGithub />
            </div>
            <div>
              <span id="madeby">Made by</span>
              <span id="me">Furkan Doğan</span>
            </div>
          </div>
        </a>
      </section>
    </aside>
  );
}
