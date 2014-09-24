/*
 * Copyright 2014 Workiva, LLC
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

var userAgentParser = require('ua-parser');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var log = console.log.bind(console);

var RESULTS_DIR = process.env.CATCHER_RESULTS_DIR || 'results';

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.status(200).send("heartbeat");
  });

  app.post('/result', function(req, res) {
    if (req.is('text/xml')) {
      writeXUnitResultsToFile(req, function(err, options) {
        if (err) {
          log('Error writing xunit to file:', err);
        } else {
          log('Saved: ' + options.filepath);
        }
      });
    }
    else if (req.is('application/json')) {
      logJsonResultsToConsole(req);
    }
    else {
      log('Got non-json, non-xml POST:', req);
    }

    res.send("received");
  });

}

function logJsonResultsToConsole(req) {
  // NOTE: req.text is our convention
  // At this point, req.text is text repr of JSON
  log(req.text);
  // log(JSON.stringify(JSON.parse(req.text), null, 2)); // pretty-printing
}

/**
 * Assume request was xunit and write as xml file named by user agent.
 * @param  {Request}   req
 * @param  {Function} callback First arg is error, next is {{filepath: string}}
 */
function writeXUnitResultsToFile(req, callback) {
  var userAgent = userAgentParser.parse(req.headers['user-agent']);
  var filename = makeFilenameFromUserAgent(userAgent);
  var filepath = path.join(RESULTS_DIR, filename);

  mkdirp(RESULTS_DIR, function (err) {
    // if (err) { throw err; }
    if (err) return callback(err);

    fs.writeFile(filepath, req.text, function (err) {
      // if (err) { throw err; }
      return callback(err, { filepath: filepath });
    });
  });

}

function makeFilenameFromUserAgent(userAgent) {
  var parts = [
    userAgent.os.family,
    userAgent.os.major,
    userAgent.os.minor,
    userAgent.device,
    userAgent.ua.family,
    userAgent.ua.major,
    userAgent.ua.minor,
  ];

  var filename = parts
    .map(function(p) { return p || ''; })
    .join('-')
    .replace(/\s+/g, '_');

  return filename + '.xml';
}