import axios from "axios";
const cheerio = require ("cheerio");
import express from "express";
const port: number = 3001

/*
implement your server code here
*/

const app = express();

const url = "https://www.konga.com/";

app.get('/', (req: any, res:{json: (data: {title: string; description: string; imageURL: string}) => void}) => {

axios.get(url).then((response: any) => {
    const html = response.data
    const $ = cheerio.load(html)
    const title = $('meta[name="application-name"]').attr('content');
    const description = $('meta[name="description"]').attr('content');
    const imageURL = $('meta[name="twitter:image"]').attr('content')
    res.json({
      title,
      description,
      imageURL
    })
  
    }).catch(err => console.log(err)) 
    
  
  })
  



app.listen(port, () => {
  console.log('Server running...')
});
