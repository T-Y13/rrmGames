import React from "react";
import SlotMachine from "./SlotMachine";

/**
 * 8日目スロット枠。マルチ時のトランザクション書き込みは SlotMachine へ委譲。
 */
export default function SlotContainer(props) {
  return <SlotMachine {...props} />;
}
