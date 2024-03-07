const https = require('https');

module.exports.getblogs =async (req,resp)=>{
   
    console.log('idhr')
    var bingdata;
    var bangdata;

    const SUBSCRIPTION_KEY = '05490cd5747c46dca9afff0183e9a92f';
    const query = 'hollywood news'
    // + encodeURIComponent(query)
//function bingWebSearch(query,bingdata) {
  https.get({
    hostname: 'api.bing.microsoft.com',
    path:     '/v7.0/news?mkt=en-us&category=Entertainment',
    headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
  }, res => {
    let body = ''
    res.on('data', part => body += part)
    res.on('end', () => {
      for (var header in res.headers) {
        if (header.startsWith("bingapis-") || header.startsWith("x-msedge-")) {
         // console.log(header + ": " + res.headers[header])
        }
      }
      resp.send(JSON.parse(body))
    //  console.log('\nJSON Response:\n')
     bingdata=JSON.parse(body);
     bangdata=body;
    
      //console.dir(JSON.parse(body), { colors: false, depth: null })
     // console.dir(bingdata,'bindata')

    })
    res.on('error', e => {
      console.log('Error: ' + e.message)
      throw e
    })
  })
//}

//res.send({bingdata,bangdata})

//bingWebSearch(query);
    
}
