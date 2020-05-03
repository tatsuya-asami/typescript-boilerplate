import './style.scss';
import { test2 } from '@ts/test2/test2';

const sampleButton = document.getElementById('sampleButton');
sampleButton!.addEventListener('click', () => {
  alert(test2(3));
});
