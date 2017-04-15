var casper = require('casper').create();
// console.log('toto is alive');
// casper.echo('hello world', 'WARNING');
// casper.exit();

// casper.start('http://www.google.fr/', function(){
//     this.capture('./output/test.png');
// });
// casper.thenOpen('http://www.bing.com/', function(){
//     this.capture('./output/test_02.png');
// })

// casper.start('http://www.google.fr', function(){
//     var title = this.evaluate(function(){
//         var title = document.title;
//         return title;
//     });
//     console.log(title);
// });


// casper.start('http://www.google.fr', function(){
//     var message = "toto";

//     var title = this.evaluate(function(message){
//         var title = document.title;
//         return title + " " + message;
//     }, message);
//     console.log(title);
// });

casper.on('remote.message', function(msg){
    console.log('remote message is: ' + msg);
});

// casper.start('http://www.google.fr', function(){
//     var title = this.evaluate(function(){
//         var title = document.title;
//         console.log(title);
//     });
// });

// casper.start('http://www.google.fr/', function(){
//     var title = this.getTitle();
//     console.log(title);
// });

casper.start('http://www.google.fr', function(){
    this.fill('form', {q:'hello world!'}, true);
});

// casper.then(function(){
//     this.capture('./output/test.png');
// })

// casper.wait(1000, function() {
//     this.evaluate(function() {
//         // var targetEl = document.querySelectorAll('.g > .rc > h3');
//         // console.log(targetEl, targertEl?length);
//         console.log(window.navigator.userAgent);
//     });
// });

var fs = require('fs');

var data;

casper.wait(1000, function() {
    data = this.evaluate(function() {
        var targetElements = document.querySelectorAll('.g h3 a');
        var data = [];
        for (var index = 0; index < targetElements.length; index++)
        {
            var currentEl = targetElements[index];
            var currentLink = currentEl.getAttribute('href');
            var currentTitle = currentEl.text;
            var currentItem = {
                'link' : currentLink,
                'title' : currentTitle,
            };

            data.push(currentItem);
        }
        // return targetElements.length;
        return data;
    });
    // console.log(data);
    // console.log(JSON.stringify(data));
});

// casper.run();
casper.run(function(){
    fs.write('./output.json', JSON.stringify(data, null, '\t'));
    this.exit();
});