import React from 'react'
import Card from './Card.jsx'
import CardsModel from '/imports/api/cards'

class CardContainer extends React.Component {
  /**
   * Store card data into database
   * @param content
   * @returns {*}
   */
  handleSave = content => {
    const { id, listId } = this.props

    if (content.length === 0) {
      if (id) {
        alert('C\'est pas un contenu ça ... :)')
        return false
      }

      return true
    }

    if (id) {
      return CardsModel.edit(id, content)
    }

    return CardsModel.add(content, listId)
  }

  /**
   * Remove card from database
   */
  handleDelete = () => {
    const { id } = this.props

    if (window.confirm('Vous êtes sûr ?')) {
      CardsModel.delete(id)
    }
  }

  render() {
    return (<Card {...this.props} handleSave={this.handleSave} handleDelete={this.handleDelete} />)
  }
}

export default CardContainer
