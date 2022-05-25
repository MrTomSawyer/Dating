import * as path from 'path'
import * as fs from 'fs'
import ErrorService from './ErrorService';

export class EmailTemplateService {
  private static readonly rootDirectory = process.cwd();
  private static readonly templatesDirectory: string = 
    path.join(EmailTemplateService.rootDirectory, 'assets/emailTemplates') 

  private static getTemplateContent(dir: string, templateName: string, source: string): Buffer {
    const fullTemplatePath = path.join(dir, templateName)

    if (!fs.existsSync(fullTemplatePath)) {
      ErrorService.throwError(
        source,
        `Template with name ${templateName} does not exist`,
        500
      );
    }

    try {
      return fs.readFileSync(fullTemplatePath);
    } catch (err) {
      ErrorService.throwError(
        source,
        `Unable to read template with name ${templateName} err: ${err.message}`,
        500
      );
    }
  }

  static createEmailHtml(templateName: string, replacements: { [id: string]: string }, source: string): string {
    let templateContent = 
      EmailTemplateService.getTemplateContent(EmailTemplateService.templatesDirectory, templateName, source).toString();

    Object.keys(replacements).forEach(key => {
      const replacementRegExp = new RegExp(`{{${key}}}`, 'gm');
      templateContent = templateContent.replace(replacementRegExp, replacements[key] ? replacements[key] : '—');
    });

    return templateContent;
  }
}