const http = require('http')
const fs = require('fs')
const url = require('url')

const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.url} : New request received\n`;
    const myUrl = url.parse(req.url, true)
    console.log(myUrl);
    fs.appendFile('log.txt', log, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })

    switch (myUrl.pathname) {
        case '/': res.end('Home Page');
            break
        case '/about':
            const userName = myUrl.query.name;
            res.end(`I, ${userName}`);
            break

        case '/search':
            const search_query = myUrl.query.search_query;
            res.end(`Hi here is you result : ${search_query}`);
            break
        default: res.end('404 Not found!')

    }
});

const port = 8000
myServer.listen(port, () => {
    console.log('Server is running')
})

