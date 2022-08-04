import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GraphQLClient, request, gql } from "graphql-request";

const initialState = {
    id: null,
    name: "",
    surname: "",
    email: "",
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async ({email, password}) => {
        const endpoint = "http://localhost:4000/api" ;
        try {
            const query = gql`
                mutation ($email: String!, $password: String!) {
                    login(
                        email: $email,
                        password: $password
                    ) {
                        token
                        user {
                            id
                            firstName
                            secondName
                            email
                        }
                    }
                }
            `

            const variables = {
                email: email,
                password: password
            }
            const data = await request(endpoint, query, variables);
            console.log(JSON.stringify(data, undefined, 2));
            localStorage.setItem('token', data.login.token);
            return data.login;
        } catch(e) {
            return "Ошибка";
        }
    }
);


export const loginCheckUser = createAsyncThunk(
    'users/loginCheckUser',
    async () => {
        const endpoint = "http://localhost:4000/api";
        try {
            const graph = new GraphQLClient(endpoint, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            });

            // graph.setHeader('authorization', localStorage.getItem('token'));

            const query = gql`
                query {
                    processList {
                        id
                    }
                }
            `
            console.log(graph)
            const data = await graph.request(query)
            console.log(JSON.stringify(data, undefined, 2));
            // const data = await request(endpoint, query, variables);
            // console.log(JSON.stringify(data, undefined, 2));
            // localStorage.setItem('token', data.login.token);
            // return data.login;
        } catch(e) {
            return ("Ошибка", e);
        }
    }
);


const loginSlice = createSlice({
    name: 'login',
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
        [loginUser.fulfilled]: (state, {payload}) => {
            console.log(payload);
            state.isFetching = false;
            state.isSuccess = true;
            state.id = payload.user.id;
            state.name = payload.user.firstName;
            state.surname = payload.user.secondName;
            state.email = payload.user.email;
            state.token = payload.token;
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },
        [loginUser.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.errorMessage
        },

        [loginCheckUser.fulfilled]: (state, {payload}) => {
            console.log(payload);
            state.isFetching = false;
            state.isSuccess = true;
            // state.id = payload.user.id;
            // state.name = payload.user.firstName;
            // state.surname = payload.user.secondName;
            // state.email = payload.user.email;
            // state.token = payload.token;
        },
        [loginCheckUser.pending]: (state) => {
            state.isFetching = true;
        },
        [loginCheckUser.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.errorMessage
        }
    }
});

const {actions, reducer} = loginSlice;

export default reducer;
export const {
    clearState
} = actions;

export const userLoginSelector = (state) => state.login;

