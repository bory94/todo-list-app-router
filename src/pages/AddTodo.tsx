import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import { CallbacksType } from '../AppContainer'

type Props = {
  callbacks: CallbacksType
}
const AddTodo = ({ callbacks }: Props) => {
  const navigate = useNavigate()
  const { addTodo } = callbacks

  const [todo, setTodo] = useState<string>('')
  const [desc, setDesc] = useState<string>('')

  const addTodoHandler = () => {
    if (todo.trim() === '') {
      alert('할 일이 입력되지 않았습니다.')
      return
    }
    addTodo(todo, desc)
    navigate('/todos')
  }

  return (
    <>
      <div className="row">
        <div className="col p-3">
          <h2>할 일 추가</h2>
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
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">설명: </label>
            <textarea
              className="form-control"
              rows={3}
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={addTodoHandler}
            >
              추 가
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

export default AddTodo
