import { Mongo } from 'meteor/mongo'
import ListsModel from '/imports/api/lists'

const BoardsModel = new Mongo.Collection('boards')

// Schema

BoardsModel.schema = new SimpleSchema({
  title: { type: String },
  createdAt: { type: Date }
})

BoardsModel.attachSchema(BoardsModel.schema)

// Methods

BoardsModel.add = title => BoardsModel.insert({ title, createdAt: new Date() }, error => {
  if (error) {
    alert('Oups. L\'ajout a échoué. Rééssayez plus tard.')
    return false
  }

  return true
})

BoardsModel.delete = id => {
  const boardsLists = ListsModel.find({ boardId: id }).fetch()
  let listRemovalError = false

  if (boardsLists.length > 0) {
    boardsLists.forEach(list => {
      const remove = ListsModel.delete(list._id)
      listRemovalError = !remove ? true : listRemovalError
    })
  }

  if (!listRemovalError) {
    return BoardsModel.remove({ _id: id }, error => {
      if (error) {
        alert('Oups. La suppression a échouée. Rééssayez plus tard.')
        return false
      }

      return true
    })
  }

  return false
}

export default BoardsModel
