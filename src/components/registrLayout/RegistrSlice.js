import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request, gql } from "graphql-request";

const initialState = {
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

export const signupUser = createAsyncThunk(
    'users/signupUser',
    async ({name, surname, email, password}) => {
        const endpoint = "http://localhost:4000/api" ;
        try {
            const query = gql`
                mutation ($firstName: String!, $secondName: String!, $email: String!, $password: String!) {
                    signup(
                        firstName: $firstName,
                        secondName: $secondName,
                        email: $email,
                        password: $password
                    )
                }
            `

            const variables = {
                firstName: name,
                secondName: surname,
                email: email,
                password: password
            }

            const data = await request(endpoint, query, variables);
            console.log(JSON.stringify(data, undefined, 2));
            localStorage.setItem('token', data.signup);
            return data.signup;
        } catch(e) {
            return "Произошла ошибка! Пользователь с такой почтой уже существует";
        }
    }
);

const registrSlice = createSlice({
    name: 'registr',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

            return state;
        }
    },
    extraReducers: {
        [signupUser.fulfilled]: (state, {payload}) => {
            console.log(payload);
            state.isFetching = false;
            state.isSuccess = true;
            state.token = payload;
        },
        [signupUser.pending]: (state) => {
            state.isFetching = true;
        },
        [signupUser.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.errorMessage
        }
    }
});

const {actions, reducer} = registrSlice;

export default reducer;
export const {
    clearState
} = actions;

export const userSelector = (state) => state.registr;

