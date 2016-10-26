import {Picker} from 'meteor/meteorhacks:picker';
import {default as cvs} from '../lib/modules/er/controlled_vocabularies';
import {default as svs} from '../lib/modules/er/suggested_vocabularies';
import {default as method_codes} from '../lib/modules/magic/method_codes';
import {default as models} from '../lib/modules/magic/data_models';
delete models['3.0']['criteria_map'];

Picker.route('/vocabularies/controlled.json', function(params, request, response, next) {
  response.setHeader('Content-Type', "text/plain;charset=utf-8");
  response.statusCode = 200;
  response.end(JSON.stringify(cvs, null, '\t'));
});

Picker.route('/vocabularies/suggested.json', function(params, request, response, next) {
  response.setHeader('Content-Type', "text/plain;charset=utf-8");
  response.statusCode = 200;
  response.end(JSON.stringify(svs, null, '\t'));
});

Picker.route('/MagIC/method-codes.json', function(params, request, response, next) {
  response.setHeader('Content-Type', "text/plain;charset=utf-8");
  response.statusCode = 200;
  response.end(JSON.stringify(method_codes, null, '\t'));
});

Picker.route('/MagIC/data-models/3.0.json', function(params, request, response, next) {
  response.setHeader('Content-Type', "text/plain;charset=utf-8");
  response.statusCode = 200;
  response.end(JSON.stringify(models['3.0'], null, '\t'));
});