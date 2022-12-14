import React from 'react'
import { useNavigate } from 'react-router'

import { CallbacksType, TodoItemType } from '../AppContainer'

type Props = {
  todoItem: TodoItemType
  callbacks: CallbacksType
}
const TodoItem = ({ todoItem, callbacks }: Props) => {
  const { id, todo, done } = todoItem
  const { toggleDone, deleteTodo } = callbacks
  const navigate = useNavigate()
  const itemClassName = done
    ? 'list-group-item list-group-item-success'
    : 'list-group-item'

  return (
    <li className={itemClassName}>
      <span
        role="button"
        tabIndex={0}
        className={done ? 'todo-done pointer' : 'pointer'}
        onKeyDown={() => toggleDone(id)}
        onClick={() => toggleDone(id)}
      >
        {todo}
        {done ? '(완료)' : ''}
      </span>
      <span
        role="button"
        tabIndex={0}
        className="float-end badge bg-secondary pointer m-1"
        onClick={() => navigate(`/todos/edit/${id}`)}
        onKeyDown={() => navigate(`/todos/edit/${id}`)}
      >
        편집
      </span>
      <span
        role="button"
        tabIndex={0}
        className="float-end badge bg-secondary pointer m-1"
        onClick={() => deleteTodo(id)}
        onKeyDown={() => deleteTodo(id)}
      >
        삭제
      </span>
    </li>
  )
}

export default TodoItem
