import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

function getWords() {
    // TODO find some external API that returns random words
    return new Promise<{ data: string[] }>((resolve) =>
        setTimeout(() => resolve({ data: ['words', 'react', 'redux', 'hello'] }), 500)
    );
}

type PAGES = 'intro' | 'game' | 'form'

export interface pageState {
    page: PAGES;
    words: string[] | null;
}

const initialState: pageState = {
    page: 'intro',
    words: null,
};

export const fetchWordsAsync = createAsyncThunk(
    'page/fetchWords',
    async () => {
        const response = await getWords();
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWordsAsync.fulfilled, (state, action) => {
                state.words = action.payload;
            });
    },
});

export const { changePage, startGame } = counterSlice.actions;

export const selectPage = (state: RootState) => state.page.page;
export const selectWords = (state: RootState) => state.page.words


export default counterSlice.reducer;
