import { Mongo } from 'meteor/mongo'
import CardsModel from '/imports/api/cards'

const ListsModel = new Mongo.Collection('lists')

// Schema

ListsModel.schema = new SimpleSchema({
  title: { type: String },
  boardId: { type: String },
  createdAt: { type: Date }
})

ListsModel.attachSchema(ListsModel.schema)

// Methods

ListsModel.add = (title, boardId) => ListsModel.insert({ title, boardId, createdAt: new Date() }, error => {
  if (error) {
    alert('Oups. L\'ajout a échoué. Rééssayez plus tard.')
    return false
  }

  return true
})

ListsModel.delete = id => {
  const cardsList = CardsModel.find({ listId: id }).fetch()
  let cardRemovalError = false

  if (cardsList.length > 0) {
    cardsList.forEach(card => {
      const remove = CardsModel.delete(card._id)
      cardRemovalError = !remove ? true : cardRemovalError
    })
  }

  if (!cardRemovalError) {
    return ListsModel.remove({ _id: id }, error => {
      if (error) {
        alert('Oups. La suppression a échouée. Rééssayez plus tard.')
        return false
      }

      return true
    })
  }

  return false
}

export default ListsModel
