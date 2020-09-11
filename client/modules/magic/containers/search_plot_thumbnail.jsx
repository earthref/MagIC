import Cookies from 'js-cookie';
import SearchPlotThumbnail from '/client/modules/magic/components/search_plot_thumbnail';
import {compose} from '@storybook/react-komposer';

export const composer = ({ id }, onData) => {
  onData(null, { files: undefined });
  Meteor.call('magicGetPmagPyPlotFiles', id, Cookies.get('user_id', Meteor.isDevelopment ? {} : { domain: '.earthref.org'}), 1, function (error, f) {
    if (error) {
      onData(null, { error });
    } else {
      let file;
      if (f && f[0] && f[0].length > 10 && f[0].slice(f[0].length - 10, f[0].length).toLowerCase() === '.thumb.png') {
        file = f[0];
      } else if (f && f[0] && f[0].length > 4 && f[0].slice(f[0].length - 4, f[0].length).toLowerCase() === '.png') {
        file = f[0].slice(0, f[0].length - 4) + '.thumb.png';
      }
      if (file) onData(null, { file });
      Meteor.call('magicGetPmagPyPlotFiles', id, Cookies.get('user_id', Meteor.isDevelopment ? {} : { domain: '.earthref.org'}), undefined, function (error, allFiles) {
        try {
          if (error) {
            onData(null, { error });
          } else {
            const files = {};
            allFiles.forEach(x => {
              if (x && x.length > 10 && x.slice(x.length - 10, x.length).toLowerCase() === '.thumb.png') {
                const file = x.slice(0, x.length - 10) + '.png';
                files[file] = files[file] || {};
                files[file].thumbnail = x;
              } else if (x && x.length > 4 && x.slice(x.length - 4, x.length).toLowerCase() === '.png') {
                files[x] = files[x] || {};
                files[x].full = x;
              }
            });
            onData(null, { file, files: _.values(files) });
          }
        } catch(e) {
          console.log('onData error', e.name, e.message);
        }
      });
    }
  });
};

export default compose(composer, {
  propsToWatch: ['id']
})(SearchPlotThumbnail);
