catcher
============================

Catcher is a small [express](http://expressjs.com/) server that collects test
results from various agents. Once a test suite is started, it can post XUnit or
JSON results to Catcher, and Catcher will save the results to the results
directory.

This is useful to have one console where you can view results from various
browsers running a test suite. It is also useful for collecting XUnit results
for external reporting.

Setup
============================

Clone the repository, install its dependencies, install nodemon if you don't
already have it, and run.

```bash
git clone git@github.com:WebFilings/catcher.git
cd catcher
npm install
npm install -g nodemon
nodemon
```

Using
============================

Once you have a Catcher server running, you can post XUnit test results to it at
`/result`

For Example (in a browser):

```JavaScript
var request = new XMLHttpRequest();
request.open('POST', 'http://localhost/result', true);
request.setRequestHeader('Content-Type', 'text/xml; charset=UTF-8');
request.send('<testsuite></testsuite>');

// Now check your results directory in catcher!
```