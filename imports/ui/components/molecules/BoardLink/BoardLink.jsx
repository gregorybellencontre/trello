import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './BoardLink.css'

class BoardLink extends React.Component {
  state = {
    displayForm: false,
    boardTitle: ''
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
    this.setState({ boardTitle: event.target.value })
  }

  /**
   * Save board data
   * @param e
   */
  handleSubmit = e => {
    e.preventDefault()

    const { handleSubmit } = this.props
    const { boardTitle } = this.state

    const submit = handleSubmit(boardTitle)

    if (submit) {
      this.displayForm(false, e)
      this.setState({ boardTitle: '' })
    }
  }

  render() {
    const { create, id, title } = this.props
    const { displayForm } = this.state

    if (create) {
      return (
        <div className="boardLink create" onClick={e => { this.displayForm(true, e) }}>
          {!displayForm && (<span>+ Ajouter un tableau</span>)}

          {displayForm && (
            <form className="boardLink__addForm" onSubmit={this.handleSubmit}>
              <input ref={this.input} placeholder="Saisissez un titre" type="text" onChange={this.handleChange} />
              <button type="submit">Ajouter</button>
              <button onClick={e => { this.displayForm(false, e) }} type="button">Annuler</button>
            </form>
          )}
        </div>
      )
    }

    return (
      <Link className="boardLink" to={`/board/${id}`}>
        {title}
      </Link>
    )
  }
}

BoardLink.defaultProps = {
  create: false,
  handleSubmit: () => {},
  id: '0',
  title: ''
}

BoardLink.propTypes = {
  create: PropTypes.bool,
  handleSubmit: PropTypes.func,
  id: PropTypes.string,
  title: PropTypes.string
}

export default BoardLink
