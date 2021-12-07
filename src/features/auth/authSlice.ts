import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import axios from 'axios'
import { PROPS_AUTH, PROPS_REGISTER } from '../types'

const apiUrl = 'https://eventlite-rails-api.herokuapp.com'

export const fetchAsyncLogin = createAsyncThunk(
  'auth/post',
  async (auth: PROPS_AUTH) => {
    await axios
      .post(`${apiUrl}/auth/sign_in`, {
        email: auth.email,
        password: auth.password,
      })
      .then((response) => {
        localStorage.setItem(
          'user',
          JSON.stringify({
            'access-token': response.headers['access-token'],
            client: response.headers['client'],
            uid: response.data.data.uid,
          })
        )
      })
  }
)

export const fetchAsyncRegister = createAsyncThunk(
  'auth/register',
  async (register: PROPS_REGISTER) => {
    await axios
      .post(`${apiUrl}/auth`, {
        email: register.email,
        password: register.password,
      })
      .then((response) => {
        localStorage.setItem(
          'user',
          JSON.stringify({
            'access-token': response.headers['access-token'],
            client: response.headers['client'],
            uid: response.data.data.uid,
          })
        )
      })
  }
)

export const fetchAsyncLogout = createAsyncThunk('event/put', async () => {
  await axios
    .delete(`${apiUrl}/auth/sign_out`, {
      data: JSON.parse(localStorage.user),
    })
    .then(() => {
      localStorage.removeItem('user')
    })
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    openSignIn: true,
    openSignUp: false,
  },
  reducers: {
    setOpenSignIn(state) {
      state.openSignIn = true
    },
    resetOpenSignIn(state) {
      state.openSignIn = false
    },
    setOpenSignUp(state) {
      state.openSignUp = true
    },
    resetOpenSignUp(state) {
      state.openSignUp = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state) => {
      state.openSignIn = false
    })
    builder.addCase(fetchAsyncRegister.fulfilled, (state) => {
      state.openSignUp = false
    })
    builder.addCase(fetchAsyncLogout.fulfilled, (state) => {
      state.openSignIn = true
    })
  },
})

//export const { } = eventSlice.actions

export const selectOpenSignIn = (state: RootState) => state.auth.openSignIn
export const selectOpenSignUp = (state: RootState) => state.auth.openSignUp

export const {
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
} = authSlice.actions

export default authSlice.reducer
