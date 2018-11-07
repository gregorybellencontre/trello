import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import './Card.css'

class Card extends React.Component {
  state = {
    content: this.props.content,
    contentEditable: false,
    createBtn: this.props.create
  }

  cardElement = React.createRef()

  /**
   * Card input configuration
   */
  setupContentEditable = () => {
    this.cardElement.current.focus()
    this.cardElement.current.addEventListener('input', this.handleChange)
  }

  /**
   * Open input for adding card
   */
  addCard = () => {
    this.setState(() => {
      return {
        contentEditable: true,
        createBtn: false
      }
    }, () => {
      this.setupContentEditable()
    })
  }

  /**
   * Open input for editing card
   */
  editCard = e => {
    e.stopPropagation()

    const { content } = this.props

    this.setState(() => {
      return {
        content,
        contentEditable: true
      }
    }, () => {
      this.setupContentEditable()
    })
  }

  /**
   * Store every card change into state
   * @param e Event
   */
  handleChange = e => {
    this.setState({ content: e.target.innerText })
  }

  /**
   * Save card
   */
  saveCard = () => {
    const { content: originalContent, handleSave, id } = this.props
    const { content } = this.state

    this.cardElement.current.removeEventListener('input', this.handleChange)

    if (originalContent !== content) {
      this.setState({
        content: '',
        contentEditable: false,
        createBtn: !id
      })

      handleSave(content)
    }

    this.setState({ contentEditable: false })
  }

  /**
   * Remove card
   * @param e
   */
  deleteCard = e => {
    e.stopPropagation()

    const { id, handleDelete } = this.props

    if (!id) {
      this.setState({
        content: '',
        contentEditable: false,
        createBtn: true
      })
    } else {
      handleDelete()
    }
  }

  render() {
    const { content, id } = this.props
    const { contentEditable, createBtn } = this.state

    if (createBtn) {
      return (<span className="cardItem create" onClick={this.addCard}>+ Ajouter une carte</span>)
    }

    return (
      <div className={cx('cardItem', { opened: contentEditable })}>
        <div
          className="cardItem__content"
          contentEditable={contentEditable}
          ref={this.cardElement}
          suppressContentEditableWarning="true"
        >
          {content}
        </div>

        <button className="cardItem__save" type="button" onClick={this.saveCard}>Enregistrer</button>
        {id && (<FaPencilAlt className="cardItem__editIcon" onClick={this.editCard} />)}
        <FaTrashAlt className="cardItem__deleteIcon" onClick={this.deleteCard} />
      </div>
    )
  }
}

Card.defaultProps = {
  content: '',
  create: false,
  id: null
}

Card.propTypes = {
  content: PropTypes.string,
  create: PropTypes.bool,
  id: PropTypes.string,
  listId: PropTypes.string.isRequired
}

export default Card
