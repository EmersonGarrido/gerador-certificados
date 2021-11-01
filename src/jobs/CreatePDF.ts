
import fs from 'fs';
import PDFDocument from 'pdfkit';
export default {
  key: 'CreatePDF',
  async handle({ data }: any) {
    const { user } = data;

    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
    });

    function jumpLine(doc, lines) {
      for (let index = 0; index < lines; index++) {
        doc.moveDown();
      }
    }

    // const existsFolderUsername = fs.existsSync(`./public/certificados/${user.full_name}/`);

    // if (!existsFolderUsername) {
    //   fs.mkdirSync(`./public/certificados/${user.full_name}`, { recursive: true });
    // }

    doc.pipe(fs.createWriteStream(`./public/certificados/${user.email}.pdf`));

    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

    doc.fontSize(10);

    const distanceMargin = 18;

    doc
      .fillAndStroke("#0e8cc3")
      .lineWidth(20)
      .lineJoin("round")
      .rect(
        distanceMargin,
        distanceMargin,
        doc.page.width - distanceMargin * 2,
        doc.page.height - distanceMargin * 2
      )
      .stroke();

    const maxWidth = 850;

    doc.image("./public/assets/example.png", doc.page.width / 2 - maxWidth / 2, 0, {
      fit: [850, 870],
      align: "center",
    });

    jumpLine(doc, 5);

    jumpLine(doc, 2);

    jumpLine(doc, 2);

    doc.font("./public/fonts/NotoSansJP-Light.otf").fontSize(33).fill("#021c27").text("", {
      align: "center",
    });

    jumpLine(doc, 1);

    doc
      .font("./public/fonts/NotoSansJP-Bold.otf")
      .fontSize(20)
      .fill("#021c27")
      .text(`${user.full_name}`, {
        align: "center",
        width: 810,
      });

    jumpLine(doc, 1);

    jumpLine(doc, 7);

    doc
      .font("./public/fonts/NotoSansJP-Bold.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("21", 375, 400, 100, {
        columns: 1,
        columnGap: 0,
        height: 40,
        align: "center",
      });

    doc
      .font("./public/fonts/NotoSansJP-Bold.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("08", 395, 400, 100, {
        columns: 1,
        columnGap: 0,
        height: 40,
        align: "center",
      });

    doc
      .font("./public/fonts/NotoSansJP-Bold.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("21", 415, 400, 100, {
        columns: 1,
        columnGap: 0,
        height: 40,
        align: "center",
      });

    jumpLine(doc, 4);


    doc.end();

  }
}