import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const DB_SCORES = 'scores';


type PAGES = 'intro' | 'game' | 'form'

export interface Word {
    value: string;
    originalValue: string;
    difficulty: number;
}

export interface Scores {
    name: string;
    score: number;
    phone?: string;
}

function getWords() {
    // TODO find some external API that returns random words
    return new Promise<{ data: string[] }>((resolve) =>
        setTimeout(() => resolve({ data: ['hello', 'react', 'redux', 'supercalifragilisticexpialidocious'] }), 500)
    );
}

function getScores() {
    return new Promise<{ data: Scores[] }>((resolve) =>
    setTimeout(() =>  resolve({data : JSON.parse(localStorage.getItem(DB_SCORES) ?? '[]') ?? [] }), 0)
    );
}

export interface pageState {
    page: PAGES;
    words: Word[];
    lives: number,
    points: number;
    scores: Scores[]
}



const initialState: pageState = {
    page: 'intro',
    words: [],
    lives: 3,
    points: 0,
    scores: []
};

export const fetchWordsAsync = createAsyncThunk(
    'page/fetchWords',
    async () => {
        const response = await getWords();
        return response.data;
    }
);

export const fetchScoresAsync = createAsyncThunk(
    'page/scores',
    async () => {
        const response = await getScores();
        console.log(response)
        return response.data;
    }
);

export const counterSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction<PAGES>) => {
            state.page = action.payload;
        },
        startGame: (state) => {
            state.page = 'game';
            state.lives = initialState.lives;
        },
        wordMiss: (state) => {
            const lives = state.lives - 1;
            if (lives <= 0) {
                state.page = 'form'
            } else {
                state.lives = lives;
            }
        },
        wordHit: (state) => {

            const points = state.points + 1;

            state.points = points;

        },

        submitForm: (state, action: PayloadAction<Scores>) => {
            state.scores.push(action.payload)
            state.page = 'intro';

            localStorage.setItem(DB_SCORES, JSON.stringify(state.scores))
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWordsAsync.fulfilled, (state, action) => {
                const words = action.payload.map((word) => {

                    // TODO find a better way to judge difficulty
                    const difficulty = word.length;

                    const value = word.split('').map((latter, index) => {
                        if (index === 0 || index === word.length - 1) {
                            return latter;
                        }
                        return Math.random() > .68 ? '_' : latter
                    }).join('');

                    return {
                        originalValue: word,
                        difficulty,
                        value,
                    } as Word

                }).sort((a, b) => a.difficulty > b.difficulty ? 1 : -1);


                state.words = words;
            });

        builder
            .addCase(fetchScoresAsync.fulfilled, (state, action) => {
                console.log(action);
                state.scores = action.payload ?? []
            })
    },
});

export const { changePage, startGame, wordHit, wordMiss, submitForm } = counterSlice.actions;

export const selectPage = (state: RootState) => state.page.page;
export const selectWords = (state: RootState) => state.page.words;
export const selectScores = (state: RootState) => state.page.scores;

export const selectLives = (state: RootState) => state.page.lives;
export const selectPoints = (state: RootState) => state.page.points;



export default counterSlice.reducer;
