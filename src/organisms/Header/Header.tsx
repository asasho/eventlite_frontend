import styles from '../Header/Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAsyncLogout,
  resetOpenSignIn,
  resetOpenSignUp,
  selectOpenSignIn,
  selectOpenSignUp,
  setOpenSignIn,
  setOpenSignUp,
} from '../../features/auth/authSlice'
import { AppDispatch } from '../../app/store'
import FlashMessage from '../../hooks/FlashMessage/FlashMessage'
import { selectIsFlashMessage } from '../../features/event/eventSlice'

const currentUser = localStorage.getItem('user')

const Header = () => {
  const dispatch: AppDispatch = useDispatch()
  const flashMessage = useSelector(selectIsFlashMessage)
  const isOpenSignIn = useSelector(selectOpenSignIn)
  const isOpenSignUp = useSelector(selectOpenSignUp)
  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <h1>Event Lite</h1>
        <div className={styles.right}>
          {!currentUser && isOpenSignUp && (
            <button
              className={styles.login_button}
              onClick={async () => {
                await dispatch(setOpenSignIn())
                await dispatch(resetOpenSignUp())
              }}
            >
              Login
            </button>
          )}
          {!currentUser && isOpenSignIn && (
            <button
              className={styles.signup_button}
              onClick={async () => {
                await dispatch(setOpenSignUp())
                await dispatch(resetOpenSignIn())
              }}
            >
              Signup
            </button>
          )}
          {currentUser && (
            <button
              className={styles.logout_button}
              onClick={async () => {
                await dispatch(fetchAsyncLogout())
                await dispatch(setOpenSignIn())
              }}
            >
              Log out
            </button>
          )}
        </div>
      </div>
      <div className={styles.flash}>
        <FlashMessage
          isFlash={flashMessage.isFlash}
          message={flashMessage.message}
          type={flashMessage.type}
        />
      </div>
    </div>
  )
}

export default Header
