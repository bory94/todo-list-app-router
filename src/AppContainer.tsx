import produce from 'immer'
import React, { useState } from 'react'

import App from './App'

export type TodoItemType = {
  id: number
  todo: string
  desc: string
  done: boolean
}
export type StatesType = {
  todoList: Array<TodoItemType>
  isLoading: boolean
}
export type CallbacksType = {
  addTodo: (todo: string, desc: string) => void
  deleteTodo: (id: number) => void
  toggleDone: (id: number) => void
  updateTodo: (id: number, todo: string, desc: string, done: boolean) => void
}

const AppContainer = () => {
  const [todoList, setTodoList] = useState<Array<TodoItemType>>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  const addTodo = (todo: string, desc: string) => {
    setLoading(true)
    const newTodoList = produce(todoList, (draft) => {
      const newId = draft.length === 0 ? 1 : Math.max(...draft.map((todo) => todo.id)) + 1
      draft.push({ id: newId, todo, desc, done: false })
    })

    setTimeout(() => {
      setTodoList(newTodoList)
      setLoading(false)
    }, 2000)
  }
  const deleteTodo = (id: number) => {
    const index = todoList.findIndex((todo) => todo.id === id)
    const newTodoList = produce(todoList, (draft) => {
      draft.splice(index, 1)
    })
    setTodoList(newTodoList)
  }
  const toggleDone = (id: number) => {
    const index = todoList.findIndex((todo) => todo.id === id)
    const newTodoList = produce(todoList, (draft) => {
      draft[index].done = !draft[index].done
    })
    setTodoList(newTodoList)
  }
  const updateTodo = (id: number, todo: string, desc: string, done: boolean) => {
    const index = todoList.findIndex((todo) => todo.id === id)
    const newTodoList = produce(todoList, (draft) => {
      draft[index] = { ...draft[index], todo, desc, done }
    })
    setTodoList(newTodoList)
  }

  const callbacks: CallbacksType = { addTodo, deleteTodo, updateTodo, toggleDone }
  const states: StatesType = { todoList, isLoading }

  return <App callbacks={callbacks} states={states} />
}

export default AppContainer
