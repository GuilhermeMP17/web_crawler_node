var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request('https://www.imdb.com/chart/moviemeter', function(err, res, body){
    if (err)console.log('Erro: '+ err);

    var $ = cheerio.load(body);

    $('.lister-list tr').each(function(){
        var title = $(this).find('.titleColumn a').text().trim();
        var rating = $(this).find('.imdbRating strong').text().trim();

        console.log('Titulo: '+ title + ' | Nota: '+ rating);

        if (!fs.existsSync('imdb.txt')) { console.log('Found file'); }

        fs.appendFile('imdb.txt', ' -- Titulo: '+ title + ' | Nota: '+ rating +'\r\n', (err) => {
            if (err) throw err;
        });
    });

});