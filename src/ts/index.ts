import { sampleFunc, test } from "./sample/sample";
import "../style.scss";

const testButton = document.getElementById("testButton");
testButton!.addEventListener("click", () => {
  console.log(test);
  console.log(sampleFunc());
});
