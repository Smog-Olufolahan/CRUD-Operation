import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from "fs";
import path from "path";

interface Data {
  organization: string;
  createdAt: string;
  updatedAt: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  id: number;
  noOfEmployees: number;
  employees: string[];
}

export const dataPath = path.resolve(__dirname, "../lib/database.json");
const PORT = process.env.PORT || 3010;
export const server: Server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    switch (req.method) {
      case "POST":
        //Post method should be routed to /create
        if (req.url === "/create") {
          let datas: any = await getDatas();
          datas = JSON.parse(datas);
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            datas.push(JSON.parse(body));
            writeData(datas);
            sendData(res, 200);
          });
        }
        break;
      case "PUT":
        //Put method should be routed to /edit/:id
        if (req.url?.match(/\/edit\/\d+/)) {
          const idNum: number = +req.url?.split("edit/")[1]!;
          let datas: any = await getDatas();
          datas = JSON.parse(datas);
          let index = datas.findIndex((item: Data) => item["id"] === idNum);
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            const bodyParsed = JSON.parse(body);
            datas[index] = { ...datas[index], ...bodyParsed };
            writeData(datas);
            sendData(res, 200);
          });
        }
        break;
      case "DELETE":
        //Delete method should be routed to /delete/:id
        if (req.url?.match(/\/delete\/\d+/)) {
          const idNum: number = +req.url?.split("delete/")[1]!;
          let datas: any = await getDatas();
          datas = JSON.parse(datas);
          let index = datas.findIndex((item: Data) => item["id"] === idNum);
          let body: string = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            datas.splice(index, 1);
            writeData(datas);
            sendData(res, 200);
          });
        }
        break;
      default:
        fs.readFile(dataPath, (err, buf) => {
          buf ? sendData(res, 200) : res.end("Data not available");
        });
        break;
    }
  }
);
const getDatas = async () => {
  try {
    return fs.readFileSync(dataPath, { encoding: "utf8", flag: "r" });
  } catch (error) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
    return fs.readFileSync(dataPath, { encoding: "utf8", flag: "r" });
  }
};
const writeData = (data: string) => {
  fs.writeFileSync(dataPath, JSON.stringify(data));
};
const sendData = async (response: ServerResponse, status: number) => {
  const datas = await getDatas();
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(datas);
};
server.listen(PORT, () => console.log(`Server started on ${PORT}`));