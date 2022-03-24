"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios")); // axios is a promise-based HTTP client 
const cheerio = require("cheerio"); // Cheerio allows use to use jQuery methods to parse an HTML string to extract information
const express_1 = __importDefault(require("express"));
const port = 3001;
/*
implement your server code here
*/
const app = express_1.default();
const url = "https://www.goal.com/en-ng";
app.get('/', (req, res) => {
    //Send an async HTTP Get request to the url
    axios_1.default.get(url).then((response) => {
        const html = response.data; // Get the HTML from the HTTP request
        const $ = cheerio.load(html); // LOad the HTML string into cheerio
        const title = $('title').text(); //Parse the HTML and extract the webpage title
        const description = $('meta[name="description"]').attr('content');
        const imageURL = $('img').attr('src');
        res.json({
            title,
            description,
            imageURL
        });
    }).catch(err => console.log(err));
});
app.listen(port, () => {
    console.log('Server running...');
});
