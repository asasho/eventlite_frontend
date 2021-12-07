import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from './app/store'
import Auth from './components/Auth/Auth'
import Events from './components/Events/Events'
import { setOpenSignIn } from './features/auth/authSlice'
import {
  fetchAsyncGetEvents,
  resetIsFlashMessage,
  selectEvents,
} from './features/event/eventSlice'
import Layout from './organisms/Layout/Layout'

const App = () => {
  const currentUser = localStorage.getItem('user')
  const dispatch: AppDispatch = useDispatch()
  const events = useSelector(selectEvents)
  useEffect(() => {
    const fetchBootLoader = async () => {
      if (currentUser) {
        await dispatch(fetchAsyncGetEvents())
        await dispatch(resetIsFlashMessage())
      } else {
        await dispatch(setOpenSignIn())
      }
    }
    fetchBootLoader()
  }, [currentUser, dispatch, events.length])
  return <Layout>{currentUser ? <Events /> : <Auth />}</Layout>
}

export default App
