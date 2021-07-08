import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchScoresAsync, fetchWordsAsync, Scores, selectScores, selectWords, startGame } from '../../features/pageStore';

const ScoresItem: React.FC<Scores> = ({ name, score, phone }) => {
    return <div className="score-item">

        <div className="score-item-inner">
            <span className="score-item-title" >{name}
            </span>
            {phone &&
                <caption className="score-item-subtitle">
                    {phone}
                </caption>
            }
        </div>
        <div className="score-item-score">{score}</div>
    </div>
}

function IntroPage() {
    const dispatch = useAppDispatch();
    const hasWords = useAppSelector(selectWords)
    const scores = useAppSelector(selectScores);
    const _scores = useMemo(() => {

        return [...scores].sort((a, b) => b.score - a.score);
    }, [scores])
    useEffect(() => {
        dispatch(fetchWordsAsync());
        dispatch(fetchScoresAsync());
    }, [dispatch])


    return <div className="intro-page">

        <h1>welcome to<br /> the geussing game</h1>
        <button
            className="playbtn"
            disabled={hasWords.length === 0}
            onClick={() => dispatch(startGame())}
        >start</button>

        {scores && scores.length > 1 && (<div>

            <h5>Scores</h5>
            <div>
                {
                    _scores.map((score) => <ScoresItem {...score} key={`${score.name}${score.score}`} />)
                }
            </div>

        </div>)

        }
    </div>
}


export default IntroPage;