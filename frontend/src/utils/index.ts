/**
 * Helper function to round a number to 2 decimal places.
 */
export const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
};
