/**
 * Returns true if input string is a valid url.
 * Returns false other wise
 * @param input
 * @returns {boolean}
 */
export const isHyperlink = (input) => {
  try {
    return !! new URL(input, input)
  } catch (_) {
    return false
  }
}
