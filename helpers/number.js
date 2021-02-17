export const toFix = (str, length = 2) => {
  if (typeof str === 'undefined') {
    return 0;
  }

  try {
    return parseFloat(str).toFixed(length);
  } catch (_err) {
    return 0;
  }
}