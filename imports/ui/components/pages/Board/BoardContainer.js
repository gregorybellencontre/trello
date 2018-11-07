import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Board from './Board.jsx'
import BoardsModel from '/imports/api/boards'
import ListsModel from '/imports/api/lists'

class BoardContainer extends React.Component {
  /**
   * Remove board from database
   */
  handleDelete = () => {
    const { board, history } = this.props

    if (window.confirm('Voulez-vous vraiment supprimer ce tableau ? Cela effacera toutes les données qu\'il contient.')) {
      const remove = BoardsModel.delete(board._id)

      if (remove) {
        history.push('/')
      }
    }
  }

  render() {
    return (<Board {...this.props} handleDelete={this.handleDelete} />)
  }
}

export default BoardContainer = withTracker(props => {
  const { match: { params: { boardId } } } = props

  return {
    board: BoardsModel.findOne({ _id: boardId }),
    lists: ListsModel.find({ boardId }).fetch()
  }
})(BoardContainer)
