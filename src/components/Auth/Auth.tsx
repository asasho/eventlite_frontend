import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from './Auth.module.scss'
import { AppDispatch } from '../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import { PROPS_AUTH, PROPS_REGISTER } from '../../features/types'
import {
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectOpenSignIn,
  selectOpenSignUp,
} from '../../features/auth/authSlice'
import { fetchAsyncGetEvents } from '../../features/event/eventSlice'

const Auth = () => {
  const isOpenSignIn = useSelector(selectOpenSignIn)
  const isOpenSignUp = useSelector(selectOpenSignUp)
  const dispatch: AppDispatch = useDispatch()
  const AuthValues: PROPS_AUTH = {
    email: '',
    password: '',
  }
  const RegisterValues: PROPS_REGISTER = {
    email: '',
    password: '',
    password_confirmation: '',
  }

  return (
    <div>
      {isOpenSignIn && (
        <div className={styles.auth_form}>
          <div className={styles.auth_form_content}>
            <h2>Login</h2>
            <Formik
              initialValues={AuthValues}
              onSubmit={async (values, { resetForm }) => {
                await dispatch(fetchAsyncLogin(values))
                await dispatch(fetchAsyncGetEvents())
                await resetForm()
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .max(50, 'Too Long !')
                  .required('Required email'),
                password: Yup.string()
                  .max(50, 'Too Long !')
                  .required('Required password'),
              })}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <div className={styles.errors}>{errors.email}</div>
                  ) : null}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <div className={styles.errors}>{errors.password}</div>
                  ) : null}
                  <button type="submit" disabled={!isValid}>
                    Login
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {isOpenSignUp && (
        <div className={styles.auth_form}>
          <div className={styles.auth_form_content}>
            <h2>Signup</h2>
            <Formik
              initialValues={RegisterValues}
              onSubmit={async (values, { resetForm }) => {
                await dispatch(fetchAsyncRegister(values))
                await dispatch(fetchAsyncGetEvents())
                await resetForm()
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .max(50, 'Too long !')
                  .required('Required email'),
                password: Yup.string()
                  .max(50, 'Too Long !')
                  .required('Required password'),
                password_confirmation: Yup.string()
                  .max(50, 'Too Long !')
                  .required('Required password confirmation'),
              })}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <div className={styles.errors}>{errors.email}</div>
                  ) : null}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <div className={styles.errors}>{errors.password}</div>
                  ) : null}
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Password Confirmation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password_confirmation}
                  />
                  {errors.password && touched.password ? (
                    <div className={styles.errors}>{errors.password}</div>
                  ) : null}
                  <button type="submit" disabled={!isValid}>
                    Signup
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  )
}

export default Auth
