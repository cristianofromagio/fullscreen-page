
import validateColor from 'validate-color';

export function validateColorCheck(colorString) {
  if (colorString && colorString !== '' && validateColor(colorString)) {
    return true;
  }
  return false;
}

export function validateColorValue(colorVal) {
  if (colorVal && colorVal !== '' && validateColor(colorVal)) {
    return colorVal;
  }
  return false;
}
