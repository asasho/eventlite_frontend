import { VFC } from 'react'
import styles from './FlashMessage.module.scss'
const Flash = require('react-reveal/Flash')

interface PROPS {
  isFlash: boolean
  message: string
  type: string
}

const FlashMessage: VFC<PROPS> = ({ isFlash, message, type }) => {
  return (
    <Flash when={isFlash} duration={5000}>
      <div className={styles.message}>
        {type === 'success' && <h2 className={styles.success}>{message}</h2>}
        {type === 'danger' && <h2 className={styles.danger}>{message}</h2>}
      </div>
    </Flash>
  )
}

export default FlashMessage
