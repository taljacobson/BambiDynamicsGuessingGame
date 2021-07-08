import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { changePage, selectLives, selectWords, wordHit, wordMiss } from "../../features/pageStore"


function GamePage() {
    const words = useAppSelector(selectWords);
    const lives = useAppSelector(selectLives);
    const dispatch = useAppDispatch();

    const [value, setValue] = useState('')

    const [wordIndex, setWordIndex] = useState(0)
    const word = words[wordIndex];

    const onCheckGuess: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (value === word.originalValue) {
            // todo success - change to next word, maybe set a timeout with some green success animation.
            setWordIndex((prev) => prev + 1);
            setValue('');
            dispatch(wordHit())
        } else {
            setValue('');
            dispatch(wordMiss())
        }
    }

    useEffect(() => {

        if (wordIndex === words.length) {
            // if last word go to form page
            dispatch(changePage('form'))
        }

    }, [dispatch, wordIndex, words.length])

    if (!word) {
        return <div />
    }

    return <div className="game-page">
        <h6>game Page</h6>
        <h5 className="lives-left">lives left
            <span style={
                { color: lives <= 1 ? 'red' : 'inherit' }
            } >{lives}</span> </h5>
        <h1 className="game-value" >
            {word.value}
        </h1>
        <form onSubmit={onCheckGuess} >
            <input autoFocus className="game-input" type="text" onChange={(e) => setValue(e.target.value)} maxLength={word.originalValue.length} value={value} />
            <br />
            <button className="checkbtn playbtn" >check Guess</button>
        </form>
    </div>
}

export default GamePage