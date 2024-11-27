import { useState, useEffect } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const useThemeToggle = () => {
  const [icon, setIcon] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? faMoon : faSun;
  });
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove(
      theme === "dark" ? "light" : "dark"
    );
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
    setIcon(theme === "dark" ? faMoon : faSun);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme, icon };
};

export default useThemeToggle;
