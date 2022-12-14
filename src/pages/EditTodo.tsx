import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { CallbacksType, StatesType, TodoItemType } from '../AppContainer'

type Props = {
  states: StatesType
  callbacks: CallbacksType
}
type TodoParam = { id?: string }
const EditTodo = ({ states, callbacks }: Props) => {
  const navigate = useNavigate()
  const { id } = useParams<TodoParam>()
  const todoItem = states.todoList.find((todo) => todo.id === parseInt(id ? id : '0'))

  if (!todoItem) {
    alert('찾을 수 없는 ID 입니다.')
    navigate('/todos')
    return <></>
  }

  const [todoOne, setTodoOne] = useState<TodoItemType>({ ...todoItem })
  const { updateTodo } = callbacks
  const updateTodoHandler = () => {
    if (todoOne.todo.trim() === '') {
      alert('반드시 할 일을 입력해야 합니다.')
      return
    }
    const { id, todo, desc, done } = todoOne
    updateTodo(id, todo, desc, done)
    navigate('/todos')
  }

  return (
    <>
      <div className="row">
        <div className="col p-3">
          <h2>할 일 수정</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="todo">할 일: </label>
            <input
              type="text"
              className="form-control"
              id="todo"
              value={todoOne.todo}
              onChange={(e) => setTodoOne({ ...todoOne, todo: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">설명: </label>
            <textarea
              className="form-control"
              rows={3}
              id="desc"
              value={todoOne.desc}
              onChange={(e) => setTodoOne({ ...todoOne, desc: e.target.value })}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="done">완료 여부:</label>
            <input
              type="checkbox"
              checked={todoOne.done}
              onChange={(e) => setTodoOne({ ...todoOne, done: e.target.checked })}
            />
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={updateTodoHandler}
            >
              수 정
            </button>
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={() => navigate('/todos')}
            >
              취 소
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditTodo
