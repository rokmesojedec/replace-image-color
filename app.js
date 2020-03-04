const replaceColor = require("./replace-color");
var express = require('express');

const chalk = require("chalk");
const app = express();

app.use((req,res)=>{
    let image = replaceColor({
        url: "img/smile.png",
        color: {
            r: 10,
            b: 40,
            g: 235
        },
        replaceColor : {
            r: 0,
            g: 0,
            b: 0
        }
    }).then((data)=>{
        let base64data = data.replace(/^data:image\/png;base64,/, '');
        var img = Buffer.from(base64data, 'base64');
        res.writeHead(200, {
          'Content-Type': 'image/png',
          'Content-Length': img.length
        });
        res.end(img); 

    });
}).listen(8080, ()=>{
    console.log("Listening on http://127.0.0.1:8080");
});


