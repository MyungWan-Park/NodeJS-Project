module.exports = {
    HTML:function(title,list,control,body){
  
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width", initial-scale="1">
        <link rel="stylesheet" href="css/bootstrap.css">
      </head>
      <body>
        <div class="container">
          <div class="jumbotron">
            <h1 class="text-center"><a class="btn btn-primary btn-lg" href="#" role="button">Myung-Wan's Homepage
            </a></h1>
          </div>
        </div>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `;
    },list:function(filelist){
    
      var list = `<ul>`;
      var i = 0;
      while(i < filelist.length){
        
        list = list + `<li><a class="btn btn-primary btn-lg" href="/?id=${filelist[i]}" role="button">${filelist[i]}</a></li>`
        i = i+1
      }
      list = list + `</ul>`;
      return list
    }
    
  }