import "./style.scss";
import * as test from "@ts/test/test";

const testButton = document.getElementById("testButton");
testButton!.addEventListener("click", () => {
  test.testAlert(test.testString);
  test.testAlert(process.env.TEST_ENV);
});
