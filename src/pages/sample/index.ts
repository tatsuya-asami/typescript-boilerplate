import './style.scss';
import { testString } from '@ts/sample/test';

const sampleButton = document.getElementById('sampleButton');
sampleButton!.addEventListener('click', () => {
  alert(testString);
});
