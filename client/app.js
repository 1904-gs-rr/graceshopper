import React from 'react'
import {Container} from 'semantic-ui-react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <Container>
      <Navbar />
      <Routes />
    </Container>
  )
}

export default App
