const formatter = new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 })

export const toFix = (str, length = 5) => {
  if (typeof str === 'undefined') {
    return 0;
  }

  try {
    return parseFloat(str).toPrecision(length);
  } catch (_err) {
    return 0;
  }
}

export const format = (str) => {
  if (typeof str === 'undefined') {
    return 0;
  }

  try {
    const formatted = formatter.format(str)
    return formatted;
  } catch (_err) {
    return 0;
  }
}