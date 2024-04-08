const checkStringMaxLength = (string,maxLength) => string.length <= maxLength;
checkStringMaxLength('проверяемая строка', 20);

const checkStringIsPalindrome = (string) => {
  const trimmedString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = trimmedString.length - 1; i >= 0; i--) {
    reverseString += trimmedString[i];
  }

  return reverseString === trimmedString;
};
checkStringIsPalindrome('Лёша на полке клопа нашёл ');

const getDigitsFromText = (string) => {
  let stringWithDigits = '';

  for (let i = 0; i < string.length; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      stringWithDigits += string[i];
    }
  }
  const parsedString = parseInt(stringWithDigits, 10);
  return Number.isNaN(parsedString) ? NaN : parsedString;
};

getDigitsFromText('2023 год');
getDigitsFromText('ECMAScript 2022');
getDigitsFromText('1 кефир, 0.5 батона');
getDigitsFromText('агент 007');
getDigitsFromText('а я томат');
