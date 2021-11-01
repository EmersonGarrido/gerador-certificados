import { CreateHtmlFile } from '../utils';
import nodeHtmlToImage from 'node-html-to-image';
import fs from 'fs';
import Queue from '../libs/Queue';

export default {
  key: 'CreateCertify',
  async handle({ data }: any) {
    const { user } = data;
    const createHtml = await CreateHtmlFile(user.full_name);
    const existsFolderUsername = fs.existsSync(`./public/certificados/${user.full_name}/`);

    if (!existsFolderUsername) {
      fs.mkdirSync(`./public/certificados/${user.full_name}`, { recursive: true });
    }

    await nodeHtmlToImage({
      output: `./public/certificados/${user.full_name}/${user.email}.png`,
      quality: 10,
      html: createHtml,
    });

    await Queue.add('CreatePDF', { user });
    console.log('chegou aqui na criação', user.full_name)

  }
}