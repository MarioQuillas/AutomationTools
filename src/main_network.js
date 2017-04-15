var casper = require('./casper_base');
var utils = require('utils');

var brokenResourceExists = false;
var urlState = {};

var urls = [
    'https://web.archive.org/web/20010405065637/http://www.bbc.co.uk/?ok',
    'http://www.google.com'
];

casper.on('resource.received', function(resource){
    // console.log(resource);
    // utils.dump(resource.url);
    // utils.dump(resource.stage);

    if (resource.stage === 'end' && resource.status > 400)
    {
        utils.dump(resource.url);
        brokenResourceExists = true;
    }
});

// casper.start('http://www.google.com');
// casper.run(function(){
    
//     casper.exit();
//     console.log('Finished');
// });

casper.start();
casper.each(urls, function(self, url, index){
    self.thenOpen(url, function(){
        urlState[url] = brokenResourceExists;
    });
    self.then(function(){
        brokenResourceExists = false;
    })
});

casper.run(function(){
    utils.dump(urlState);
    this.exit();
});