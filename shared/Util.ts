import * as fs from 'fs';
import { AppConfiguration } from '../configs/Application.config';

export class Util {

  public static findControllerFiles = (dir, filelist) => {
    const controllerMask = AppConfiguration.env === 'DEV' ? 'controller.ts' : 'controller.js';
    const files = fs.readdirSync(`${dir}`);
    filelist = filelist || [];
    files.forEach(file => {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = Util.findControllerFiles(`${dir}${file}/`, filelist);
      } else if (file.includes(controllerMask)) {
        filelist.push(`../${dir}${file}`);
      }
    });
    return filelist;
  }

  public static sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
}
