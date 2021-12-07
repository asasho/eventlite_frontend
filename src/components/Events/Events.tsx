import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAsyncDeleteEvent,
  fetchAsyncGetEvents,
  fetchAsyncNewEvent,
  fetchAsyncShowEvent,
  selectEvents,
  setOpenEditPage,
} from '../../features/event/eventSlice'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AppDispatch } from '../../app/store'
import styles from './Events.module.scss'
import EditModal from '../../molecules/modal/EditModal/EditModal'
import styled from 'styled-components'
import moment from 'moment'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { PROPS_DELETEEVENT, PROPS_NEWEVENT } from '../../features/types'

const Events: React.FC = () => {
  const events = useSelector(selectEvents)
  const dispatch: AppDispatch = useDispatch()

  const EventValues: PROPS_NEWEVENT = {
    title: '',
    start_datetime: null,
    location: '',
  }

  const handleDelete = async (
    title: string,
    id: number,
    event: PROPS_DELETEEVENT
  ) => {
    const result = window.confirm(
      `Are you sure about deleting the event (${title}) ?`
    )
    if (result) {
      await dispatch(fetchAsyncShowEvent(id))
      await dispatch(fetchAsyncDeleteEvent(event))
      await dispatch(fetchAsyncGetEvents())
    }
  }

  return (
    <div className={styles.event}>
      <div className={styles.event_form}>
        <div className={styles.event_form_content}>
          <h2>Create an Event !</h2>
          <Formik
            initialValues={EventValues}
            onSubmit={async (values, { resetForm }) => {
              await dispatch(fetchAsyncNewEvent(values))
              await resetForm()
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string()
                .max(50, 'Too Long !')
                .required('Required title'),
              start_datetime: Yup.date().required('Required start date time'),
              location: Yup.string()
                .max(50, 'Too Long !')
                .required('Required location'),
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                {errors.title && touched.title ? (
                  <div className={styles.errors}>{errors.title}</div>
                ) : null}
                <StyledDatePicker
                  name="start_datetime"
                  id="start_datetime"
                  placeholderText="Date"
                  selected={values.start_datetime}
                  onBlur={handleBlur}
                  onChange={(date: Date | null) => {
                    setFieldValue('start_datetime', date)
                  }}
                />
                {errors.start_datetime && touched.start_datetime ? (
                  <div className={styles.errors}>{errors.start_datetime}</div>
                ) : null}
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                />
                {errors.location && touched.location ? (
                  <div className={styles.errors}>{errors.location}</div>
                ) : null}
                <button type="submit" disabled={!isValid}>
                  Create !
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className={styles.event_list}>
        {events.map((event) => (
          <div className={styles.event_tag} key={event.id}>
            <div className={styles.event_title}>
              <h2>{event.title}</h2>
            </div>
            <div className={styles.event_bottom}>
              <div className={styles.event_content}>
                <div className={styles.event_start_datetime}>
                  <p>
                    {moment(
                      event.start_datetime,
                      'YYYY-MM-DDThh:mm:ss:SSSZ'
                    ).format('MMM Do YYYY')}
                  </p>
                </div>
                <div className={styles.event_location}>
                  <p>{event.location}</p>
                </div>
              </div>
              <div className={styles.event_list_button}>
                <button
                  className={styles.edit_button}
                  onClick={async () => {
                    await dispatch(fetchAsyncShowEvent(event.id))
                    await dispatch(setOpenEditPage())
                  }}
                >
                  Edit
                </button>
                <button
                  className={styles.delete_button}
                  onClick={() => {
                    handleDelete(event.title, event.id, event)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <EditModal />
    </div>
  )
}

export default Events

const StyledDatePicker = styled(DatePicker)`
  box-sizing: border-box;
  border-radius: 3px;
  border-color: #d1d0d2;
  height: 35px;
  margin-bottom: 10px;
  width: 500px;
`
