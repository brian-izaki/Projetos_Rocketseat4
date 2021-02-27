function formatToTwoZero(valueToFormat: number): string {
  let isUnit = false;
  const valueString = String(valueToFormat);

  if (valueToFormat < 10) {
    isUnit = true;
  }

  return isUnit ? `0${valueString}` : valueString;
}

export {
  formatToTwoZero,
};
