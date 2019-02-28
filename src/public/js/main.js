// $(document).ready(function(){
//   $.ajax(ajax);
// });


// /*************
//        SAMPLE URLS
       
//        1. To get the config data like image base urls
//        https://api.themoviedb.org/3/configuration?api_key=<APIKEY>
       
//        2. To fetch a list of movies based on a keyword
//        https://api.themoviedb.org/3/search/movie?api_key=<APIKEY>&query=<keyword>
       
//        3. To fetch more details about a movie
//        https://api.themoviedb.org/3/movie/<movie-id>?api_key=<APIKEY>
// *************/

// let baseURL = 'https://api.themoviedb.org/3/';
// let getConfig = function () {
//             let url = "".concat(baseURL, 'configuration?api_key=', apiKey); 
//             fetch(url)
//             .then((result)=>{
//                 return result.json();
//             })
//             .then((data)=>{
//                 baseImageURL = data.images.secure_base_url;
//                 configData = data.images;
//                 console.log('config:', data);
//                 console.log('config fetched');
//                 runSearch('jaws')
//             })
//             .catch(function(err){
//                 alert(err);
//             });
//         }


// var ajax = {
//   url: '/search/getAll',
//   type: 'get',
//   dataType: 'json',
//   success: function(postings) {
//     console.log(postings);
//     for (var i = 0; i < postings.length; i++) {
//       $('#foundSearches').append('<li>' + postings[i].titleName + 'by ' + postings[i].author + '(' + postings[i].userId + ')</li>');
//       console.log(postings[i].titleName);
//     }
//   },
//   error: function(err) {
//     console.log(err);
//   }
// }


