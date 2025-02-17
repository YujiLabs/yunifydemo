import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const themes = [
  { key: "default", color: "#252B3B" },
  { key: "dark", color: "#1E1E2F" },
  { key: "blue", color: "#5078F2" },
  { key: "green", color: "#3BA776" },
];

const ThemeSwitcher = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switcher">
      <h6>Theme</h6>
      <div className="theme-options">
        {themes.map((t) => (
          <button
            key={t.key}
            className={`theme-btn ${theme === t.key ? "active" : ""}`}
            style={{ backgroundColor: t.color }}
            onClick={() => changeTheme(t.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
