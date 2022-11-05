import Cookies from 'js-cookie';
import SearchPlotThumbnail from '/client/modules/magic/components/search_plot_thumbnail';
import {compose} from '@storybook/react-komposer';

const typeRe = new RegExp(`_TY:_POLE_.*?(\.png)`);

export const composer = ({ id }, onData) => {
  onData(null, { files: undefined });
  Meteor.call('magicGetPmagPyPlotFiles', id, Cookies.get('user_id', Meteor.isDevelopment ? {} : { domain: '.earthref.org' }), undefined, function (error, allFiles) {
    try {
      if (error) {
        onData(null, { error });
      } else {
        let file;
        const files = {};
        allFiles.forEach(x => {
          if (x && x.length > 10 && x.slice(x.length - 10, x.length).toLowerCase() === '.thumb.png' && typeRe.test(x)) {
            file = x;
            const f = x.slice(0, x.length - 10) + '.png';
            files[f] = files[f] || {};
            files[f].thumbnail = x;
          } else if (x && x.length > 4 && x.slice(x.length - 4, x.length).toLowerCase() === '.png' && typeRe.test(x)) {
            file = x.slice(0, x.length - 4) + '.thumb.png';
            files[x] = files[x] || {};
            files[x].full = x;
          }
        });
        onData(null, { file, files: _.values(files) });
      }
    } catch (e) {
      console.log('onData error', e.name, e.message);
    }
  });
};

export default compose(composer, {
  propsToWatch: ['id']
})(SearchPlotThumbnail);
