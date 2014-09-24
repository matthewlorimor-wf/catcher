# Journal
Since this is a project in a new area, I'll try to maintain a dev journal to explain decisions and inform new devs (and for my own memory).

This is a node app that uses Express to handle POSTs which are JSON and describe test results (automated unit/functional tests). Express uses [middleware](http://stephensugden.com/middleware_guide/) to simplify/wrap handling of data.

## CORS
To POST from one domain to a different domain requires [enabling cross-origin resource sharing](http://enable-cors.org/). Good to know!
