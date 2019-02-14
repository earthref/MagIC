import Cookies from 'js-cookie';
import React from 'react';
import SearchPlot from '/client/modules/magic/components/search_plot';
import {compose} from 'react-komposer';

export const composer = ({ file }, onData) => {
  onData(null, { source: undefined });
  Meteor.call('magicGetPmagPyPlot', file, Cookies.get('user_id'), function (error, source) {
    if (source) {
      onData(null, { source });
    } else {
      onData(null, { error });
    }
  });
};

export default compose(composer, {
  propsToWatch: ['file']
})(SearchPlot);
