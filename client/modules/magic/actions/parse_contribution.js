export default {
  create({Meteor, LocalState}, text) {
    if (!text) {
      return LocalState.set('PARSE_MAGIC_TEXT_FILE', 'Comment text is required.');
    }

  },

  clearErrors({LocalState}) {
    return LocalState.set('PARSE_MAGIC_TEXT_FILE', null);
  }
};