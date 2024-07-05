import { useSelector } from "react-redux";
import { useEffect, useState, useRef, SyntheticEvent } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useParams, useLocation } from 'react-router-dom';

import SearchIconGif from "../../assets/search.gif";
import SearchIconPng from "../../assets/search.png";
import "../Search/Search.scss";
import { searchContentActions } from "../../Store/SearchContent";

type StateType = {
  searchContent: {
    searchValue: string;
    isSearching: boolean;
    isResults: boolean;
  };
};

const Cheat = () => {


    function useQuery() {
    return new URLSearchParams(useLocation().search);
    }
let query = useQuery();
//seqkluvgtzoipna
console.log(query.get('q'))
  const [imageSrc, setImageSrc] = useState(SearchIconPng);

  const inputRef = useRef<HTMLInputElement>(null);
  let { letter } = useParams();
  console.log(letter)
  const reduxDispatch = useDispatch()

  const [possibleMatches, setPossibleMatches] = useState<string[]>([]);
  const [wordsHasLetters, setWordsHasLetters] = useState<string[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const searchBtnHandler = (event: SyntheticEvent) => {
    console.log("click");
  }

useEffect(() => {
//     event.preventDefault();
    console.log("search")
    // let searchWord = inputRef.current?.value;
    let searchWord = query.get('q');
    console.log(inputRef.current?.value)
    reduxDispatch(searchContentActions.startSearching())
    reduxDispatch(searchContentActions.showResults());

    setPossibleMatches([]);
    setIsMatching(true);
        fetch("/words_altissia.txt")
                .then((response) => response.text())
                .then((data) => {
                    let resultWords: string[] = [];
                const wordsArray = data.split(/\r?\n/); // Split into array of words
        console.log(wordsArray)
                const scrambledLetters = [searchWord]; // Copy and parse string of letters into array
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
                        console.log(searchWord);
                    if (searchWord.includes(letter)) {
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
//   }
 }, []);
 
  const btnHoverHandler = (action: String) => {
    if (action === "enter"){
      setImageSrc(SearchIconGif)
    } else if (action === "leave"){
      setImageSrc(SearchIconPng)
    }
  }

  const inputChangeHandler = (event: SyntheticEvent) => {
    reduxDispatch(searchContentActions.setValue({
      value: inputRef.current?.value
    }))
    console.log(inputRef.current?.value)
  }

  return (
    <div className="form__container">
        {wordsHasLetters}
      {/* <form className="form__element">
        <input onChange={inputChangeHandler} ref={inputRef} type="text" placeholder="Insert letters here" />
        <button onClick={searchBtnHandler} onMouseEnter={() => btnHoverHandler("enter")} onMouseLeave={() => btnHoverHandler("leave")}>
          <img src={imageSrc} width={30} />
        </button>
      </form> */}
    </div>
  );
};

export default Cheat;
