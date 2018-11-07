import { Mongo } from 'meteor/mongo'

const CardsModel = new Mongo.Collection('cards')

// Schema

CardsModel.schema = new SimpleSchema({
  content: { type: String },
  listId: { type: String },
  createdAt: { type: Date }
})

CardsModel.attachSchema(CardsModel.schema)

// Methods

CardsModel.add = (content, listId) => CardsModel.insert({ content, listId, createdAt: new Date() }, error => {
  if (error) {
    alert('Oups. L\'ajout a échoué. Rééssayez plus tard.')
    return false
  }

  return true
})

CardsModel.edit = (id, content) => CardsModel.update({ _id: id }, { '$set': { content } }, error => {
  if (error) {
    alert('Oups. La mise à jour a échouée. Rééssayez plus tard.')
    return false
  }

  return true
})

CardsModel.delete = id => CardsModel.remove({ _id: id }, error => {
  if (error) {
    alert('Oups. La suppression a échouée. Rééssayez plus tard.')
    return false
  }

  return true
})

export default CardsModel
