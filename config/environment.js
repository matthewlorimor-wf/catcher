/*
 * Copyright 2014-2015 Workiva Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var getRawBody = require('raw-body');
var cors = require('cors');

module.exports = function(app, express){

  app.use(function (req, res, next) {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb',
      encoding: 'utf8'
    }, function (err, string) {
      if (err) { return next(err); }

      req.text = string;
      next();
    });
  });

  app.use(express.static(__dirname + '/public')); // Serves from / by default

  app.use(cors());

};