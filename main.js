var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js')
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    // console.log(url.parse(_url, true))
    if(pathname === '/'){
      
      if(queryData.id === undefined){
        fs.readdir('./data',function(error, filelist){
          var title = "Welcome";
          var description = "Hello Node JS"
          var list = template.list(filelist);
          var html = template.HTML(title,list,
            `<a href="/create">create</a>`,
            `<h2>${title}</h2><p>${description}</p>`);
          response.writeHead(200);
          response.end(html);

        });
          
      }else{
        fs.readdir('./data',function(error, filelist){
        //어떻게 동작하길래 이게 보안을 막을 수 있을까? base는 파일 이름이기 때문에 ../password.js 에서 ../가 없어지고 password.js 만 filteredId로 넘어간다. 따라서 ../가 없어져서 안전함.
        
          var filteredId = path.parse(queryData.id).base;
        console.log(filteredId);
        fs.readFile(`data/${filteredId}`, 'utf8', function(err,description){
          
          var list = template.list(filelist);
          var title = queryData.id;
          var sanitizedDescription = sanitizeHtml(description, {
            allowedTags: [ 'h1' ]
          });
          var sanitizedTitle = sanitizeHtml(title);
          var html = template.HTML(title,list,
            `<a href="/create">create</a> 
            <a href="/update?id=${sanitizedTitle}">update</a>
            <form action="delete_process" method="POST">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>`,
             `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`);
        response.writeHead(200);
        response.end(html);
    
        });
     
      });
      }

    }else if(pathname === "/create"){
      fs.readdir('./data',function(error, filelist){
          
        var title = "WEB - create";
        var list = template.list(filelist);
        var html = template.HTML(title,list,
          '',`
        <form action="/create_process" method="post"> 
          <p><input type = "text" name="title" placeholder="title"></p>
          <p><textarea name="description" placeholder="description"></textarea></p>
          <p><input type = "submit"></p>
        </form>`);
        response.writeHead(200);
        response.end(html);

      });
    }else if(pathname === '/update'){
      fs.readdir('./data',function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err,description){
          
          var list = template.list(filelist);
          var title = queryData.id;
          var html = template.HTML(title,list,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`,`
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}"> 
              <p><input type = "text" name="title" placeholder="title" value="${title}"></p>
              <p><textarea name="description" placeholder="description">${description}</textarea></p>
              <p><input type = "submit"></p>
            </form>`);
        response.writeHead(200);
        response.end(html);
    
        });
     
      });
    
  }else if(pathname === "/create_process"){

            var body = '';
    
            request.on('data', function (data) {
                body += data;
    
            });
    
            request.on('end', function () {
                var post = qs.parse(body);
                // console.log(post)
                var description = post.description
                var title = post.title
              // 파일 덮어 쓰기 및 리다이렉트
                fs.writeFile(`data/${title}`, description, 'utf8', function(){
                  response.writeHead(302, {
                    'Location': `/?id=${title}`});
                  response.end();
                });
            });
    }else if(pathname === "/update_process"){
      var body = '';
    
      request.on('data', function (data) {
          body += data;

      });

      request.on('end', function () {
          var post = qs.parse(body);
          var id = post.id;
          var description = post.description;
          var title = post.title;
          // console.log(post);
          fs.rename(`data/${id}`, `data/${title}`, function(error){
            fs.writeFile(`data/${title}`, description, 'utf8', function(){
              response.writeHead(302, {
                'Location': `/?id=${title}`});
              response.end();
            });
          });
      });
      
    }else if(pathname === "/delete_process"){

      var body = '';

      request.on('data', function (data) {
          body += data;

      });

      request.on('end', function () {
          var post = qs.parse(body);
          var id = post.id;
          var filteredId = path.parse(id).base;
          fs.unlink(`data/${filteredId}`,function(error){
            response.writeHead(302, {
              'Location': `/`});
            response.end();
          })

      });
}
    else{
      response.writeHead(404);
      response.end('Not Found');
    }
 
});
app.listen(3000);