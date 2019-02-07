import Cookies from 'js-cookie';
import SearchPlotThumbnail from '/client/modules/magic/components/search_plot_thumbnail';
import {compose} from 'react-komposer';

export const composer = ({ id }, onData) => {
  onData(null, { files: undefined });
  Meteor.call('magicGetPmagPyPlotFiles', id, Cookies.get('user_id'), function (error, files) {
    if (error) {
      onData(null, { error });
    } else {
      onData(null, { files });
    }
  });
};

export default compose(composer, {
  propsToWatch: ['id']
})(SearchPlotThumbnail);
