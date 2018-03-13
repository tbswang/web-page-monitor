//modules needed
const http = require('http');
const crypto = require('crypto');
const schedule = require('node-schedule');

// get url from config.js
const config = require('./config.js');
const url = config.url;

let md5 = crypto.createHash('md5');

//get the content of html page
function getHtmlResult() {
    http.get(url, (res) => {
        const { statusCode } = res;
        let err;
        if (statusCode != 200) {
            err = new Error('请求失败.\n' + `状态码:${statusCode}`);
        }
        if (err) {
            console.log(err.message);
            res.resume();
            return;
        }
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                let htmlMd5 = md5.update(rawData).digest('hex');
                console.log(Date());
                console.log(htmlMd5);
            } catch (e) {
                console.error(e.message);
            }
        });
    })
}

getHtmlResult();