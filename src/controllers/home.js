// Home Controller
const express       = require('express'),
    HomeController  = express.Router(),
    Boss            = require(__dirname + '/../models/boss'),
    Employee        = require(__dirname + '/../models/employee'),
    bcrypt          = require('bcrypt'),
    session         = require('express-session'),
    fetch           = require("node-fetch"),
    request         = require('request'),
    cheerio         = require('cheerio'),
    URL             = require('url-parse');

       



    /*************
           SAMPLE URLS
           
           1. To get the config data like image base urls
           https://api.themoviedb.org/3/configuration?api_key=<APIKEY>
           
           2. To fetch a list of movies based on a keyword
           https://api.themoviedb.org/3/search/movie?api_key=<APIKEY>&query=<keyword>
           
           3. To fetch more details about a movie
           https://api.themoviedb.org/3/movie/<movie-id>?api_key=<APIKEY>
    *************/

// HOME PAGE -> LOGIN
HomeController.route('/?') 
  .get(function(req, res, next) {
    res.render('home');
  })
   .post(function(req, res, next) { 
      let baseURL = 'https://api.themoviedb.org/3/search/movie?api_key=09bef58264dfd94d2a9fc4dcd061da8f&query='
      let url = "".concat(baseURL, req.body.movieTitle); 


      //MOVIEDB THING! 
      fetch(url).then(response => {
        return response.json();
      }).then(data => {
        let movieID     = data.results[0].id; 
        let altTitleURL = `https://api.themoviedb.org/3/movie/${movieID}/alternative_titles?api_key=09bef58264dfd94d2a9fc4dcd061da8f&country=JP`;
            // to use substition ${}, you have to use grave sign ` same key as ~
/////////////////////////////////
//Above is just to get the ID from MovieDB

        fetch(altTitleURL).then(altTitleResponse => {
          return altTitleResponse.json();
///////////////////////////////////
// Above is to run the MovieDB ID through their 
// other API route to get the JP title


        }).then(altTitleData => {
          console.log(makeTitleForURL(req.body.movieTitle)); 

          if (altTitleData.titles.length > 0) {    // Check if array of titles is empty
            res.render('home', {
              message:  altTitleData.titles[0].title,
              message2: makeTitleForURL(req.body.movieTitle)
            })  
          }
          else {
            res.render('home', {
              message: 'Sorry, no Japanese title found!',
              message2: makeTitleForURL(req.body.movieTitle)
          })  
        }

        }).catch(altTitleErr => {
          console.log(altTitleErr);
          res.render('home', {
            message: 'Error 833: Sorry, there was an error finding your alternative title.',
            message2: makeTitleForURL(req.body.movieTitle)
          })
        })
      }).catch(err => {
        res.render('home', {
          message: 'Error 834: Sorry, there was an error with your movie title submission.'
        })
      })



      //MAKE STRINGS WITH %20 or + 
      var makeTitleForURL = (titleSubmission) => {
        // let changedTitles = [];
        let tempTitle1    = "";
        let tempTitle2    = "";
        for (i = 0; i < titleSubmission.length; i++) {
          if (titleSubmission[i] === " ") {
            tempTitle1 += "%20";
            tempTitle2 += "+";
          }
          else {
            tempTitle1 += titleSubmission[i];
            tempTitle2 += titleSubmission[i];
          }
        }
        // changedTitles.push(tempTitle1);
        // changedTitles.push(tempTitle2);
        // console.log('tt1: ' + changedTitles[0]);
        // console.log('tt2: ' + changedTitles[1]);
        // return changedTitles; 



// This should be separate function but I suck with scope 
// This part is gonna run crawler through Tsutaya's site
// It's using the helper above to get a URL. 
    // var grabTsutaya = (urlPart1, urlPart2) => {
        var pageToVisit = `https://tsutaya.tsite.jp/search/${tempTitle1}?dm=0&ds=1&sc_int=tsutaya_header_search_keyword&k=${tempTitle1}`;
        console.log("Visiting page " + pageToVisit);

        var tsutayaTitle = "Searching..........!";
        request(pageToVisit, function(error, response, body) {
          if(error) {
            console.log("Error: " + error);
          }
          // Check status code (200 is HTTP OK)
          console.log("Status code: " + response.statusCode);
          if(response.statusCode === 200) {
            // Parse the document body
            var $ = cheerio.load(body);
            // console.log("JP Title:  " + $('.c_thumb_tit').first().text());
            tsutayaTitle = $('.c_thumb_tit').first().text();
            console.log('tsutayaTitle: ' + tsutayaTitle);
          }
        })
        return tsutayaTitle;
      } //makeTitleforURL 
    }); //post 


module.exports = HomeController;





/// to start Tsutaya Web Crawler, you want to get the first <li> of
    // <ul class="c_thumb_list_row c_js_equal_height" data-eh-el="c_thumb_info" data-eh-row="5" data-eh-row-sp="2">


// and inside that <LI>, you want this <A> child element.
    
    // <div class="c_thumb_info" style="min-height: 0px; height: 39px;">
        //<p class="c_thumb_tit">
            //<a href="item/movie/PTA00007Y9GC?sc_int=tsutaya_search_title_201610">ジョーズ</a>
        //</p>
    //</div>


// https://tsutaya.tsite.jp/search/my%20cousin%20vinny?dm=0&ds=1&sc_int=tsutaya_header_search_keyword&k=my+cousin+vinny




