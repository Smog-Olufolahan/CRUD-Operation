import axios from "axios"; // axios is a promise-based HTTP client 
const cheerio = require ("cheerio"); // Cheerio allows use to use jQuery methods to parse an HTML string to extract information
import express from "express";
const port: number = 3001

/*
implement your server code here
*/

const app = express();

const url = "https://www.goal.com/en-ng";

app.get('/', (req: any, res:{json: (data: {title: string; description: string; imageURL: string}) => void}) => {

  //Send an async HTTP Get request to the url
axios.get(url).then((response: any) => { 
    const html = response.data // Get the HTML from the HTTP request
    const $ = cheerio.load(html) // LOad the HTML string into cheerio
    const title = $('title').text(); //Parse the HTML and extract the webpage title
    const description = $('meta[name="description"]').attr('content');
    const imageURL = $('img').attr('src')
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
