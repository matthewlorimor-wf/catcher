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

function Catcher(port) {
    this.port = port;
    this.app = null;
    this.server = null;
    this.started = false;
}

Catcher.prototype = {
    start: function() {
        if (this.started) {
            return;
        }
        this.started = true;
        var express = require('express');
        var log = console.log.bind(console);

        var DEFAULT_PORT = 3000;

        this.app = express();
        require('./config/environment')(this.app, express);
        require('./config/routes')(this.app);
        this.app.set('port', this.port || process.env.CATCHER_PORT || process.env.PORT || DEFAULT_PORT);
        var self = this;
        this.server = this.app.listen(this.app.get('port'), function() {
          log('listening on http://localhost:' + self.app.get('port'));
          log('POST test results to http://localhost:' + self.app.get('port') + '/result');
        });
    },
    stop: function() {
        this.server.close();
        this.started = false;
    }
};

module.exports = Catcher;