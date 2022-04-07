export const validateEnum =
  <T>(possibleValues: T[], allowEmpty = false) =>
  (value: T): boolean =>
    (allowEmpty && (value === null || value === undefined)) ||
    possibleValues.includes(value);
