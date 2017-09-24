import {Picker } from 'meteor/meteorhacks:picker';

import { cvs } from '/lib/modules/er/controlled_vocabularies';
import { svs } from '/lib/modules/er/suggested_vocabularies';
import { methodCodes } from '/lib/configs/magic/method_codes';
import { models } from '/lib/configs/magic/data_models';

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
  response.end(JSON.stringify(methodCodes, null, '\t'));
});

Picker.route('/MagIC/data-models/3.0.json', function(params, request, response, next) {
  response.setHeader('Content-Type', "text/plain;charset=utf-8");
  response.statusCode = 200;
  response.end(JSON.stringify(_.without(models['3.0'], 'criteria_map'), null, '\t'));
});