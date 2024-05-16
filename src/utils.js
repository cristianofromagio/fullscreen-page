
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

  if (colorVal.length == 3 || colorVal.length == 6) {
    const naiveHex = "#"+colorVal;
    if (validateColor(naiveHex)) {
      return naiveHex;
    }
  }

  return false;
}
