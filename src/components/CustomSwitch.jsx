import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { SunIcon } from "../assets/icons/SunIcon";
import { MoonIcon } from "../assets/icons/MoonIcon";

const ThemeSwitch = (props) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>

        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-10 h-10",
              "flex items-center justify-center",
              "rounded-lg   bg-default/40 ",
            ],
          })}
        >
          {isSelected ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  );
};

export default ThemeSwitch;
