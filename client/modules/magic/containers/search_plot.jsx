import Cookies from 'js-cookie';
import React from 'react';
import SearchPlot from '/client/modules/magic/components/search_plot';
import {compose} from 'react-komposer';

export const composer = ({ id, file }, onData) => {
  onData(null, { source: undefined });
  Meteor.call('getPmagPyPlot', id, file, Cookies.get('user_id'), function (error, source) {
    if (source) {
      onData(null, { source });
    } else {
      onData(null, { error });
    }
  });
};

export default compose(composer, {
  propsToWatch: ['id', 'file']
})(SearchPlot);
