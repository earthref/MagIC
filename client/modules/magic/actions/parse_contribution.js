export default {
  create({Meteor, LocalState}, text) {
    if (!text) {
      return LocalState.set('PARSE_CONTRIBUTION_ERROR', 'Contribution text is required.');
    }

  },

  clearErrors({LocalState}) {
    return LocalState.set('PARSE_CONTRIBUTION_ERROR', null);
  }
};
