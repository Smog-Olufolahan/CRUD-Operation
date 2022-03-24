"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio = require("cheerio");
const express_1 = __importDefault(require("express"));
const port = 3001;
/*
implement your server code here
*/
const app = express_1.default();
const url = "https://www.konga.com/";
// interface Data {
//   title: string;
//   description: string;
//   image: string;
// }
app.get('/', (req, res) => {
    axios_1.default.get(url).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const title = $('meta[name="application-name"]').attr('content');
        const description = $('meta[name="description"]').attr('content');
        const imageURL = $('meta[name="twitter:image"]').attr('content');
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
