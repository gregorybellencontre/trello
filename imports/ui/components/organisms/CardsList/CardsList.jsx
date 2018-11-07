import React from 'react'
import PropTypes from 'prop-types'
import { FaTrashAlt } from 'react-icons/fa'
import Card from '../../atoms/Card'
import './CardsList.css'

class CardsList extends React.Component {
  state = {
    displayForm: false,
    listTitle: ''
  }

  input = React.createRef()

  /**
   * Display add form
   * @param displayForm
   * @param e
   */
  displayForm = (displayForm = true, e) => {
    e.stopPropagation()

    this.setState(() => {
      return { displayForm }
    }, () => {
      if (displayForm) {
        this.input.current.focus()
      }
    })
  }

  /**
   * Store every change into state
   * @param event
   */
  handleChange = event => {
    this.setState({ listTitle: event.target.value })
  }

  /**
   * Save list data
   * @param e
   */
  handleSubmit = e => {
    e.preventDefault()

    const { boardId, handleSubmit } = this.props
    const { listTitle } = this.state

    const submit = handleSubmit(listTitle, boardId)

    if (submit) {
      this.displayForm(false, e)
      this.setState({ listTitle: '' })
    }
  }

  render() {
    const { cards, create, handleDelete, id, title } = this.props
    const { displayForm } = this.state

    if (create) {
      return (
        <div className="cardsList create" onClick={e => { this.displayForm(true, e) }}>
          {!displayForm && (<span className="cardsList__addList">+ Ajouter une liste</span>)}

          {displayForm && (
            <form className="cardsList__addForm" onSubmit={this.handleSubmit}>
              <input ref={this.input} placeholder="Saisissez un titre" type="text" onChange={this.handleChange} />
              <button type="submit">Ajouter</button>
              <button onClick={e => { this.displayForm(false, e) }} type="button">Annuler</button>
            </form>
          )}
        </div>
      )
    }

    return (
      <div className="cardsList">
        <h3>{title}</h3>

        <FaTrashAlt className="cardsList__deleteIcon" onClick={handleDelete} />

        {cards.length > 0 && cards.map(card => (
          <Card
            key={card._id}
            id={card._id}
            content={card.content}
            listId={id}
          />
        ))}

        <Card create listId={id} />
      </div>
    )
  }
}

CardsList.defaultProps = {
  create: false,
  handleSubmit: () => {},
  title: ''
}

CardsList.propTypes = {
  boardId: PropTypes.string.isRequired,
  create: PropTypes.bool,
  handleSubmit: PropTypes.func,
  title: PropTypes.string
}

export default CardsList
