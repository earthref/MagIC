import Cookies from 'js-cookie';
import SearchPlotThumbnail from '/client/modules/magic/components/search_plot_thumbnail';
import {compose} from 'react-komposer';

export const composer = ({ id }, onData) => {
  onData(null, { files: undefined });
  Meteor.call('magicGetPmagPyPlotFiles', id, Cookies.get('user_id'), function (error, allFiles) {
    if (error) {
      onData(null, { error });
    } else {
      const files = {};
      allFiles.forEach(x => {
        if (x && x.length > 10 && x.slice(x.length - 10, x.length).toLowerCase() === '.thumb.png') {
          const file = x.slice(0, x.length - 10) + x.slice(x.length - 4, x.length);
          files[file] = files[file] || {};
          files[file].thumbnail = x;
        } else if (x && x.length > 4 && x.slice(x.length - 4, x.length).toLowerCase() === '.png') {
          files[x] = files[x] || {};
          files[x].full = x;
        }
      });
      onData(null, { files: _.values(files) });
    }
  });
};

export default compose(composer, {
  propsToWatch: ['id']
})(SearchPlotThumbnail);
