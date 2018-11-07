import React from 'react'
import BoardLink from './BoardLink.jsx'
import BoardsModel from '/imports/api/boards'

class BoardLinkContainer extends React.Component {
  /**
   * Store board data into database
   * @param boardTitle
   * @returns {*}
   */
  handleSubmit = boardTitle => {
    if (boardTitle.length === 0) {
      alert('C\'est pas un titre ça ... :)')
      return false
    }

    return BoardsModel.add(boardTitle)
  }

  render() {
    return <BoardLink {...this.props} handleSubmit={this.handleSubmit} />
  }
}

export default BoardLinkContainer
