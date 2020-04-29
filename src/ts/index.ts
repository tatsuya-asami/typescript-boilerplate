import { sampleFunc, test } from "./sample/sample";

const testButton = document.getElementById("testButton");
testButton!.addEventListener("click", () => {
  console.log(test);
  console.log(sampleFunc());
});
