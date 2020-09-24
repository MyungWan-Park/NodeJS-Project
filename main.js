var http = require('http');
var url = require('url');
var fs = require('fs');

function templateHTML(title,list,body){

  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;

};

function templateLIst(dirlist){

  var list = `<ol>`;
  var i = 0;
  while(i < dirlist.length){
    list = list + `<li><a href="/?id=${dirlist[i]}">${dirlist[i]}</a></li>`
    i = i+1;
  }

  list = list + `</ol>`;
  return list
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){

        fs.readdir('./data', function(error, dirlist){
          
          var title = 'Welcome';
          var description = 'Hello NodeJs!';
          var list = templateLIst(dirlist);
          var template = templateHTML(title,list,`<h2>${title}</h2><p>${description}</p>`);

          response.writeHead(200);
          response.end(template);
        })


      }else{

        fs.readdir('./data', function(error, dirlist){

          fs.readFile(`data/${queryData.id}`,'utf8', function(err, description) {
          
          var list = templateLIst(dirlist);
          var title = queryData.id;
          var template = templateHTML(title,list,`<h2>${title}</h2><p>${description}</p>`);

          response.writeHead(200);
          response.end(template);
        })
      })
      }
    }else{
      response.writeHead(404);
      response.end("not found");
    }

});
app.listen(3000);
