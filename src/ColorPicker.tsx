import React from "react";
import { HexColorPicker } from "react-colorful";
import useConfigStore, { ConfigItems } from "./store";

export default function ColorPicker() {
  const store = useConfigStore();
  const current = store.current as keyof ConfigItems;
  return (
    current && (
      <HexColorPicker
        style={{
          position: "fixed",
          top: "50%",
          left: "200px",
          zIndex: 1000,
        }}
        onChange={(color) => store.changeColor(color)}
        color={store.items[current]}
      />
    )
  );
}
