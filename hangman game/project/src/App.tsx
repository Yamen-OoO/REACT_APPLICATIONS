import { HangmanDrawings } from './HangmanDrawings'
import { HamgmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'
import words from './worldList.json'
import { useCallback, useEffect, useState } from 'react'
function App() {


  function getWord() {
    return words[Math.floor(Math.random() * words.length)]

  }


  const [wordToGuess, setWordToGuess] = useState(getWord())


  // array contains all the letter i presses (wrong and corrrect letter)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  // console.log(guessedLetters)



  //array of incurrect letters
  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )


  const isLoser = incorrectLetters.length >= 6 // body parts   //true or false
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter)) // true or false



  // callback used to make sure addGuesssedLetter not to rerender only when guessedLetters changes
  const addGuessedLetter = useCallback((letter: string) => {
    // if letter (key is pressed before) is in the array or you win or lost reutrn
    if (guessedLetters.includes(letter) || isWinner || isLoser) return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])






  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      // if key not a letter like(1,/']) return
      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetter(key)
    }
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }


    // useEffect is gonna run when ever guessedLetters changes ... so addGuessedLetter() 
    // works which it helps to update the guessletters array (empty array at the beging)
  }, [guessedLetters])








  // to refresh when press enter at the end of the game
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (key !== "Enter") return
      e.preventDefault()

      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])






  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "You Win - Refresh to try again"}
        {isLoser && "Nice Try - Refresh to try again"}
      </div>
      <HangmanDrawings numberOfGusesses={incorrectLetters.length} />
      <HamgmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          disabled={isWinner || isLoser}
        />
      </div>

    </div>
  )
}

export default App
