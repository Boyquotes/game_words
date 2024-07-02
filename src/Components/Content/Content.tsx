import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import "./Content.scss";
import MatchingGif from "../../assets/matching.gif";
import { searchContentActions } from "../../Store/SearchContent";

type StateType = {
  searchContent: {
    searchValue: string;
    isSearching: boolean;
    isResults: boolean;
  };
};

const Content = () => {
  const searchContent = useSelector((state: StateType) => state.searchContent);

  const [possibleMatches, setPossibleMatches] = useState<string[]>([]);
  const [wordsHasLetters, setWordsHasLetters] = useState<string[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const reduxDispatch = useDispatch();

  useEffect(() => {
    if (searchContent.isSearching) {
      setPossibleMatches([]);
      setIsMatching(true);

//      fetch("/words.txt")
      fetch("/words_altissia.txt")
        .then((response) => response.text())
        .then((data) => {
            let resultWords: string[] = [];
          const wordsArray = data.split(/\r?\n/); // Split into array of words
console.log(wordsArray)
          const scrambledLetters = [...searchContent.searchValue]; // Copy and parse string of letters into array
console.log(scrambledLetters.length)

          /* This codeblock gets all the words that cantains the letters */
          const matchedWords = wordsArray.filter((word) => {
            let counter = 0;
console.log(word);
console.log(word.length);
console.log(word.split(''))
            const wordLetters = word.split('');
            console.log(wordLetters);
            wordLetters.forEach((letter) => {
                console.log(letter);
                console.log(searchContent.searchValue);
              if (searchContent.searchValue.includes(letter)) {
                  console.log('ok')
                  console.log(letter)
                counter++;
                console.log(counter)
              }
            });

            if (counter === word.length) {
              console.log('mot '+word)
              resultWords.push(word);
              console.log(resultWords);
            } 

            // scrambledLetters.forEach((letter) => {
            //     console.log(letter);
            //   if (word.includes(letter)) {
            //     counter++;
            //   }
            // });

            // if (counter === scrambledLetters.length && word.length === scrambledLetters.length) {
            //   return word;
            // }
          });
          console.log("matchedWords "+matchedWords)
            // sort ascending - shorter items first
            console.log(resultWords.sort((a, b) => a.length - b.length));

            // sort descending - longer items first
            console.log(resultWords.sort((a, b) => b.length - a.length));
          setWordsHasLetters(resultWords);
          console.log("matchedWords "+wordsHasLetters)
          /* End of codeblock */

          /* This codeblock gets the exact word(s) that can be built with the letters */
          // Remove words that are longer than scrambledLetters length
          const sameLengthMatchedWords = matchedWords.filter(
            (word) => word.length === scrambledLetters.length
          );

          // Compare each letter in dic words to the informed letters - goal: find matched letters
          let foundLetters: string[] = []; // fo

          sameLengthMatchedWords.forEach((dicWord) => {
            // foot
            let scrambledLettersCopy = scrambledLetters.slice(); // too // Copy the original scrambledLetters so for each word loop, the original is restored for reevaluation

            // Take each letter in dicWord and compare to scrambledLetters
            [...dicWord].forEach((dicWordLetter) => {
              // o
              for (let i = 0; i < scrambledLettersCopy.length; i++) {
                if (dicWordLetter === scrambledLettersCopy[i]) {
                  // o === o
                  // If one of the letters in dicWord matches, take the letter and push to foundLetters.
                  foundLetters.push(dicWordLetter);
                  // Remove the matched letter from scrambledLettersCopy based on its index
                  scrambledLettersCopy.splice(i, 1);
                  break;
                }
              }
            });

            // Check if foundLetters is complete. Incomplete means that only part of the words matched.
            if (foundLetters.length === scrambledLetters.length) {
              const foundWord = foundLetters.reduce(
                (prevLetter, currentLetter) => prevLetter + currentLetter
              ); // Merge found letters

              // Compare this merged letters (word) to each matchedWord
              matchedWords.forEach((word) => {
                if (foundWord === word) {
                  setPossibleMatches((prevValue) => [...prevValue, foundWord]);
                  foundLetters = []; // Reset foundLetters to be reused
                }
              });
            } else {
              foundLetters = [];
            }
          });
        });

      reduxDispatch(searchContentActions.stopSearching());
    }
  }, [searchContent.isSearching, possibleMatches]);

  return (
    <main className="main">
      <div className="main__scrambled">
        <h2>Scrambled letters</h2>
        {searchContent.searchValue ? (
          <p>{searchContent.searchValue}</p>
        ) : (
          <span className="blinking-cursor"></span>
        )}
      </div>
      {searchContent.isResults && possibleMatches && (
        <div className="main__match-test">
          <div className="main__mt__matched-words">
            <h2>Possible Match</h2>
            <div className="main__mt__mw__possible-match">
              {possibleMatches &&
                possibleMatches.map((matchedWord) => {
                  return <p key={Math.random()}>{matchedWord}</p>;
                })}
            </div>
            {!possibleMatches.length && isMatching && (
              <p className="not-found">Not found</p>
            )}
            <h2>Words that contains</h2>
            <div className="main__mt__mw__contain-words">
              {wordsHasLetters &&
                wordsHasLetters.map((word) => {
                  return <p key={Math.random()}>{word}</p>;
                })}
            </div>
          </div>
        </div>
      )}
      {searchContent.isSearching && !possibleMatches && (
        <div className="main__mt__matching">
          <img src={MatchingGif} />
          <p>Matching...</p>
        </div>
      )}
    </main>
  );
};

export default Content;
