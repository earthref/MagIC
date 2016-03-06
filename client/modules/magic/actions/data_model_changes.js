import {_} from 'lodash';
import Runner from './runner';

export default class extends Runner {

  constructor({LocalState}) {
    super('DATA_MODEL_CHANGE_LOG', {LocalState});
  }

  changes(model) {

    let modelChanges = {};

    return modelChanges;

  }

}
