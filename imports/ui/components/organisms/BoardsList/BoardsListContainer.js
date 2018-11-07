import { withTracker } from 'meteor/react-meteor-data'
import BoardsList from './BoardsList.jsx'
import BoardsModel from '/imports/api/boards'

export default BoardsListContainer = withTracker(() => {
  return {
    boards: BoardsModel.find().fetch(),
  };
})(BoardsList);
