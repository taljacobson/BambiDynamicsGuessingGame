import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchWordsAsync, selectWords, startGame } from '../../features/pageStore';

function IntroPage() {
    const dispatch = useAppDispatch();
    const hasWords = useAppSelector(selectWords)


    useEffect(() => {
        dispatch(fetchWordsAsync())
    }, [dispatch])


    return <div>

        <h1>welcome to the geussing game</h1>
        <button
            disabled={!hasWords}
            onClick={() => dispatch(startGame())}
        >start</button>


    </div>
}


export default IntroPage;