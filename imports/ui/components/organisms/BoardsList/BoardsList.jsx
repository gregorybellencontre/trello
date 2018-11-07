import React from 'react'
import PropTypes from 'prop-types'
import './BoardsList.css'
import BoardItem from '../../molecules/BoardLink'

const BoardsList = ({ boards }) => (
  <div className="boardsList">
    <h2>Vos tableaux</h2>

    <div className="boardsGrid">
      {boards.map(board => (
        <BoardItem key={board._id} id={board._id} title={board.title} />
      ))}

      <BoardItem create />
    </div>
  </div>
)

BoardsList.defaultProps = {
  boards: []
}

BoardsList.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({}))
}

export default BoardsList
