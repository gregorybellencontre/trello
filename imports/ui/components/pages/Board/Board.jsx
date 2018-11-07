import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../organisms/Layout'
import CardsList from '../../organisms/CardsList'
import './Board.css'
import PropTypes from "prop-types";

const Board = ({ board, handleDelete, lists }) => {
  if (!board || Object.keys(board).length === 0) {
    return null
  }

  return (
    <Layout>
      <Link className="boardPage__backLink" to="/">&lt; Revenir à mes tableaux</Link>

      <h2>{board.title}</h2>

      <button className="boardPage__removeBoard" onClick={handleDelete} type="button">Supprimer ce tableau</button>

      <div className="boardPage__container">
        {lists.map(list => (
          <CardsList
            key={list._id}
            boardId={board._id}
            id={list._id}
            title={list.title}
          />
        ))}

        <CardsList create boardId={board._id} />
      </div>
    </Layout>
  )
}

Board.defaultProps = {
  lists: []
}

Board.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({}))
}

export default Board
