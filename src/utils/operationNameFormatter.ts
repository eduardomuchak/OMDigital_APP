export const operationNameFormatter = (operationName: string) => {
  // Remove all _ adjusts the spaces between words and capitalize the first letter of each word
  const operationNameLowerCased = operationName.toLocaleLowerCase();
  const operationNameSplitted = operationNameLowerCased.split('_');
  const operationNameSplittedBySpace = operationNameSplitted.map((word) =>
    word.split(' '),
  );
  const operationWithNoSpaceIfExist = operationNameSplittedBySpace.flat();

  const operationNameCapitalized = operationWithNoSpaceIfExist.map(
    (word) => word.charAt(0).toLocaleUpperCase() + word.substring(1),
  );

  return operationNameCapitalized.join(' ');
};
