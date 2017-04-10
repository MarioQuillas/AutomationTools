var url = 'https://duckduckgo.com/';

// casper.test.begin('Testing the page status', function(test){
//     casper.start(url, function(){
//         test.assertHttpStatus(200, 'Page is up and running');
//     });

//     casper.then(function(){
//         // var toto = casper.getCurrentUrl();
//         // casper.echo(toto);
//         test.assert( casper.getCurrentUrl() === url, 'URL is the one expected');
//     });

//     casper.run(function(){
//         test.done();
//     });

// });

function checkSelectorForAttr(selector, attr){
    var results = [];
    var elements = document.querySelectorAll(selector);
    
    if (elements.length === 0){
        return null;
    }

    for (var i = 0; i < elements.length; i++)
    {
        var current = elements[i];
        var hasAttr = current.hasAttribute(attr);

        if (!hasAttr) {
            results.push(current.outerHTML);
        }
    }

    return results;
}

casper.options.remoteScripts.push('https://code.jquery.com/jquery-2.2.3.min.js');

casper.test.begin('Testing the accesibility', function(test){
    casper.start(url, function(){
        this.evaluate(function() {
            $.noConflict();
        })
    });

    casper.then(function(){
        test.assertDoesntExist('a input', 'Input element doesnt exist inside an anchor element');
    })

    casper.then(function(){
        test.assertExists('html[lang]', 'A html element with a "lang" attribute exists');
        test.assertTruthy(this.getElementAttribute('html[lang]', 'lang'), 'html lang attribute has a value');
    });

    casper.then(function(){
        test.assertExists('head title', 'A title element exists inside the head');
    });

    casper.then(function(){
        var imagesWithNoAttr = this.evaluate(checkSelectorForAttr, 'img', 'alt');
        if (imagesWithNoAttr && imagesWithNoAttr.length > 0){
            test.fail('Some images don\t have an "alt" attribute ');
        }
    });

    casper.run(function(){
        test.done();
    });

});

// casper.exit();