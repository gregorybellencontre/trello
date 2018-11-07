import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import CardsList from './CardsList.jsx'
import ListsModel from '/imports/api/lists'
import CardsModel from '/imports/api/cards'

class CardsListContainer extends React.Component {
  /**
   * Store list data into database
   * @param listTitle
   * @param boardId
   * @returns {*}
   */
  handleSubmit = (listTitle, boardId) => {
    if (listTitle.length === 0) {
      alert('C\'est pas un titre ça ... :)')
      return false
    }

    return ListsModel.add(listTitle, boardId)
  }

  /**
   * Remove list from database
   * @returns {*|boolean}
   */
  handleDelete = () => {
    const { id } = this.props

    if (window.confirm('Vous êtes sûr ? Les cartes à l\'intérieur seront également effacées !')) {
      return ListsModel.delete(id)
    }
  }

  render() {
    return (
      <CardsList
        {...this.props}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
      />
    )
  }
}

export default CardsListContainer = withTracker(props => {
  const { id } = props

  return {
    cards: CardsModel.find({ listId: id }).fetch(),
  }
})(CardsListContainer)
