import { ReactNode, VFC } from 'react'
import styled from 'styled-components'
import Header from '../Header/Header'

interface PROPS_LAYOUT {
  children: ReactNode
}

const Layout: VFC<PROPS_LAYOUT> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  )
}

export default Layout

const Wrapper = styled.div`
  position: relative;
`
