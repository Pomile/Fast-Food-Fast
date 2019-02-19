import createElement from '../tools/createElement';

const camelCase = (words) => {
  const wordsToArr = words.split(' ');
  // convert the first word to small letter
  const firstWord = wordsToArr[0].toLocaleLowerCase();
  wordsToArr[0] = firstWord;
  // convert the first letter of the remaining words to uppercase
  const remainingWords = wordsToArr.slice(1);
  remainingWords.map((word, i) => {
    const firstLetter = word[0].toLocaleUpperCase();
    const remainingLetters = word.slice(1);
    const newWord = firstLetter + remainingLetters;
    remainingWords[i] = newWord;
  });
  const camelStyle = [firstWord].concat(remainingWords).join('');
  return camelStyle;
};


const navigation = (links, anchorClasses) => {
  const navigationDiv = createElement('div');
  navigationDiv.className = 'navigation navigation-shift-right hide-on-medium-and-down';
  links.map((link) => {
    const linkDiv = createElement('div');
    linkDiv.className = 'navigation__item';
    const anchorDiv = createElement('a');
    anchorDiv.className = anchorClasses.toString().replace(',', '  ');
    anchorDiv.href = `#${link.path}`;
    anchorDiv.innerHTML = link.name;
    const btnName = camelCase(`${link.name}`);
    anchorDiv.onclick = `(event) => {
        event.preventDefault();
        alert('you win')
    }`;
    anchorDiv.id = `${btnName}Btn`;
    linkDiv.appendChild(anchorDiv);
    navigationDiv.appendChild(linkDiv);
  });
  return navigationDiv;
};


export default navigation;
