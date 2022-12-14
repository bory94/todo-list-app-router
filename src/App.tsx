import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { CallbacksType, StatesType } from './AppContainer'
import Layout from './components/Layout'
import Loading from './components/Loading'
import About from './pages/About'
import AddTodo from './pages/AddTodo'
import EditTodo from './pages/EditTodo'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import TodoList from './pages/TodoList'

type Props = {
  callbacks: CallbacksType
  states: StatesType
}

function App({ states, callbacks }: Props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={'about'} element={<About />} />
          <Route
            path={'todos'}
            element={<TodoList states={states} callbacks={callbacks} />}
          />
          <Route path={'todos/add'} element={<AddTodo callbacks={callbacks} />} />
          <Route
            path={'todos/edit/:id'}
            element={<EditTodo states={states} callbacks={callbacks} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {states.isLoading ? <Loading /> : <></>}
    </Router>
  )
}

export default App
