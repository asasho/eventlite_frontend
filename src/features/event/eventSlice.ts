import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import axios from 'axios'
import { PROPS_DELETEEVENT, PROPS_NEWEVENT, PROPS_UPDATEEVENT } from '../types'
// import { showMessage } from 'react-native-flash-message'

const apiUrl = 'https://eventlite-rails-api.herokuapp.com'

export const fetchAsyncGetEvents = createAsyncThunk('event/get', async () => {
  const res = await axios.get(`${apiUrl}/events`, {
    headers: JSON.parse(localStorage.user),
  })
  return res.data
})

export const fetchAsyncShowEvent = createAsyncThunk(
  'show/get',
  async (id: number) => {
    const res = await axios.get(`${apiUrl}/events/${id}`, {
      headers: JSON.parse(localStorage.user),
    })
    return res.data
  }
)

export const fetchAsyncNewEvent = createAsyncThunk(
  'event/post',
  async (newEvent: PROPS_NEWEVENT) => {
    const res = await axios.post(
      `${apiUrl}/events`,
      {
        title: newEvent.title,
        start_datetime: newEvent.start_datetime,
        location: newEvent.location,
      },
      {
        headers: JSON.parse(localStorage.user),
      }
    )
    return res.data
  }
)

export const fetchAsyncEditEvent = createAsyncThunk(
  'event/put',
  async (editEvent: PROPS_UPDATEEVENT) => {
    const res = await axios.put(
      `${apiUrl}/events/${editEvent.id}`,
      {
        title: editEvent.title,
        start_datetime: editEvent.start_datetime,
        location: editEvent.location,
      },
      {
        headers: JSON.parse(localStorage.user),
      }
    )
    return res.data
  }
)

export const fetchAsyncDeleteEvent = createAsyncThunk(
  'event/delete',
  async (deleteEvent: PROPS_DELETEEVENT) => {
    const res = await axios.delete(`${apiUrl}/events/${deleteEvent.id}`, {
      headers: JSON.parse(localStorage.user),
    })
    return res.data
  }
)

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [
      {
        id: 0,
        title: '',
        start_datetime: null,
        location: '',
      },
    ],
    event: {
      id: 0,
      title: '',
      start_datetime: null,
      location: '',
    },
    openEditPage: false,
    isFlashMessage: {
      isFlash: false,
      message: '',
      type: '',
    },
  },
  reducers: {
    setOpenEditPage(state) {
      state.openEditPage = true
    },
    resetOpenEditPage(state) {
      state.openEditPage = false
    },
    resetIsFlashMessage(state) {
      state.isFlashMessage.isFlash = false
      state.isFlashMessage.message = ''
      state.isFlashMessage.type = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetEvents.fulfilled, (state, action) => {
      state.events = action.payload
    })
    builder.addCase(fetchAsyncShowEvent.fulfilled, (state, action) => {
      state.event = action.payload
    })
    builder
      .addCase(fetchAsyncNewEvent.fulfilled, (state, action) => {
        state.events = [...state.events, action.payload]
        state.isFlashMessage = {
          isFlash: true,
          message: 'Created successfully !',
          type: 'success',
        }
      })
      .addCase(fetchAsyncNewEvent.rejected, (state) => {
        state.isFlashMessage = {
          isFlash: true,
          message: 'Fail to Create',
          type: 'danger',
        }
      })
    builder
      .addCase(fetchAsyncEditEvent.fulfilled, (state, action) => {
        state.event = action.payload
        state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        )
        state.isFlashMessage = {
          isFlash: true,
          message: 'Updated successfully !',
          type: 'success',
        }
      })
      .addCase(fetchAsyncEditEvent.rejected, (state) => {
        state.isFlashMessage = {
          isFlash: true,
          message: ' Fail to Update',
          type: 'danger',
        }
      })
    builder
      .addCase(fetchAsyncDeleteEvent.fulfilled, (state, action) => {
        state.event = action.payload
        state.events.filter((event) => event.id !== action.payload.id)
        state.isFlashMessage = {
          isFlash: true,
          message: 'Deleted successfully !',
          type: 'success',
        }
      })
      .addCase(fetchAsyncDeleteEvent.rejected, (state) => {
        state.isFlashMessage = {
          isFlash: true,
          message: ' Fail to Delete',
          type: 'danger',
        }
      })
  },
})

//export const { } = eventSlice.actions

export const selectEvents = (state: RootState) => state.event.events
export const selectOneEvent = (state: RootState) => state.event.event
export const selectIsOpenEdit = (state: RootState) => state.event.openEditPage
export const selectIsFlashMessage = (state: RootState) =>
  state.event.isFlashMessage
export const { setOpenEditPage, resetOpenEditPage, resetIsFlashMessage } =
  eventSlice.actions

export default eventSlice.reducer
