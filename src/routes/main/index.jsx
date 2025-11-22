import { useState } from 'react'
import Index from '../../sections/atendimento'

import Servicos from '../../sections/servicos'
import Search from '../../sections/search'
import First from '../../sections/first'
import Contacts from '../../sections/contacts'
import Watch from '../../sections/whatch'
import Levels from '../../sections/levels'
import Protocols from '../../sections/protocols'
import Equipe from '../../sections/equipe'
import Header from '../../sections/header/Index'


function Main() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Index />
      <Levels />
      <Protocols />
      <Equipe />
      <Servicos/>
      <Search />
      <First />
      <Contacts />
    </>
  )
}

export default Main
