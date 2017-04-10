var casper = require('casper').create();
var fs = require('fs');

var data;
var config;

if (fs.exists('./page_rendering/config.json') && fs.exists('./page_rendering/data.json')){
    data = require('./page_rendering/data.json');
    config = require('./page_rendering/config.json');
}
else {
    casper.exist();
}

var urls = data.urls;
var viewportSizes = config.viewportSizes;

// var urls = ["http://www.google.fr", "http://www.bing.com"];
// var viewportSizes = [480, 720, 1200];



// console.log(urls);
// console.log(viewportSizes);

// casper.exit();

casper.start();

var counter = 0;
casper.repeat(viewportSizes.length, function(){
    var viewportSize = viewportSizes[counter];
    console.log(viewportSize);

    casper.viewport(viewportSize, 1000).each(urls, function(self, item, index){
        // console.log(self, item, index);
        self.thenOpen(item, function(){
            var title = this.getTitle();
            console.log(title);

            this.wait(2000, function(){
                this.capture('./images/screenshot_'+ index + '_' + viewportSize + '.png');
            });
            
        });
    });
    counter += 1;
});


casper.run(function(){
    console.log('Finished');
    casper.exit();
});