import fs from "fs";
import path from "path";

export default async function (user: string) {
  const background = fs.readFileSync("./public/template/img/background.png");
  const convertBackground = Buffer.from(background).toString("base64");

  var html = `<!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='http://fonts.googleapis.com/css?family=Lato:400,700,900' rel='stylesheet' type='text/css'>
    <title>PatrocineGram</title>
  
    <style>

      body {
        background-image: url('data:image/png;base64,${convertBackground}');
        height: 2480px;
        width: 3508px;
        background-repeat: no-repeat;
        background-size: cover;
      }
  
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      .box-name{
        margin-top: 245px;
        height: 250px;
        width: 1500px;
        margin-left: 420px;
      }

      .box-date{
        margin-top: 500px;
        height: 150px;
        width: 1250px;
        margin-left: 845px;
      }
  
      .name {
        text-align: center;
        font-size: 120px;
        font-family: 'Lato', sans-serif;
        font-weight: black;
        color: black;
      }

      .data {
        font-size: 50px;
        font-family: 'Lato', sans-serif;
        font-weight: bold;
        color: black;
      }
      .margin{
        margin-left: 25px;
      }

    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="box-name">
        <span class="name">${user}</span>
      </div>
      <div class="box-date">
      <span class="data">
        <span>21</span>
        <span class="margin">09</span>
        <span class="margin">21</span>
      </span>
    </div>
    </div>
  </body>
  
  </html>
  `;

  return html;
}
