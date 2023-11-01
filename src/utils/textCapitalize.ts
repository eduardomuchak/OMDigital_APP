export const textCapitalizer = (text: string) => {
  const familyNameLowerCased = text.toLocaleLowerCase();
  const familyNameSplitted = familyNameLowerCased.split(' ');
  const familyNameCapitalized = familyNameSplitted.map(
    (word) => word.charAt(0).toLocaleUpperCase() + word.substring(1),
  );
  return familyNameCapitalized.join(' ');
};
