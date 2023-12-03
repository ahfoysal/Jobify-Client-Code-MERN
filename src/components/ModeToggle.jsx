import { useTheme } from "../hooks/useTheme";
import { MoonIcon } from "../assets/icons/MoonIcon";
import { SunIcon } from "../assets/icons/SunIcon";
import ThemeSwitch from "./CustomSwitch";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <ThemeSwitch
        defaultSelected={theme == "dark" ? true : false}
        size="lg"
        onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
        color="secondary"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      ></ThemeSwitch>
    </div>
  );
}
