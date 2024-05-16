import styles from './keyboard.module.css'
const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
]

type KeyboardProps = {
    activeLetters: string[]
    inactiveLetters: string[]

    // type of addGuessedLetter is a function return nothing
    addGuessedLetter: (letter: string) => void

    disabled?: boolean
}


export function Keyboard({ activeLetters, inactiveLetters, addGuessedLetter , disabled}: KeyboardProps) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit , minmax(75px , 1fr)',
                gap: '.5rem'
            }}>
            {KEYS.map(key => {
                const isActive = activeLetters.includes(key) // true or false // if array includes this letter // true // if not // false
                const isInActive = inactiveLetters.includes(key) // true or false // used to override clase styles.active and make disabled
                return (
                    <button
                        onClick={() => addGuessedLetter(key)}
                        className={`${styles.btn} ${isActive ? styles.active : ''}  ${isInActive ? styles.inactive : ''}`}
                        disabled={isActive || isInActive || disabled} // false false = false // true false = true
                        key={key}>

                        {key}
                    </button>
                )
            })}
        </div>
    )

}