import Modal from 'react-modal'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import {
  fetchAsyncEditEvent,
  fetchAsyncGetEvents,
  resetOpenEditPage,
  selectIsOpenEdit,
  selectOneEvent,
} from '../../../features/event/eventSlice'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './EditModal.module.scss'
import styled from 'styled-components'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { PROPS_UPDATEEVENT } from '../../../features/types'

const customStyle = {
  overlay: {
    backgroundColor: '#777777',
  },
  content: {
    top: '50%',
    left: '50%',
    width: 400,
    height: 350,
    padding: '50px',
    transform: 'translate(-50%, -50%)',
  },
}

const EditModal: React.FC = () => {
  Modal.setAppElement('#root')
  const isOpenEditPage = useSelector(selectIsOpenEdit)
  const event = useSelector(selectOneEvent)
  const dispatch: AppDispatch = useDispatch()
  const EditValues: PROPS_UPDATEEVENT = {
    id: event.id,
    title: event.title,
    start_datetime: null,
    location: event.location,
  }

  return (
    <>
      <Modal
        isOpen={isOpenEditPage}
        onRequestClose={async () => {
          await dispatch(resetOpenEditPage())
        }}
        style={customStyle}
      >
        <div className={styles.event_form}>
          <h2>Edit the Event !</h2>
          <Formik
            initialValues={EditValues}
            onSubmit={async (values) => {
              await dispatch(fetchAsyncEditEvent(values))
              await dispatch(resetOpenEditPage())
              await dispatch(fetchAsyncGetEvents())
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
                  Update !
                </button>
              </form>
            )}
          </Formik>
          <button
            onClick={async () => {
              await dispatch(resetOpenEditPage())
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  )
}

export default EditModal

const StyledDatePicker = styled(DatePicker)`
  box-sizing: border-box;
  border-radius: 3px;
  border-color: #d1d0d2;
  height: 35px;
  margin-bottom: 10px;
  width: 300px;
`
