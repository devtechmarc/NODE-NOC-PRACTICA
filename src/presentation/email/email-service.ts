import nodemailer from 'nodemailer';
import { envVars } from '../../config/plugins/envs.plugin';
import { LogEntity } from '../../domain/entity/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';

export interface IEmailService {
    to : string | string[],
    subject : string,
    htmlBody : string,
    attachments? : IAttachments[]
    //todo from
}

export interface IAttachments {
    filename : string, 
    path : string,
    //etc de las demas opciones https://nodemailer.com/message/attachments/
}

export class EmailService {


    constructor(){}

    //creamos la configuracion del mail que vamos a mandar
    transporter = nodemailer.createTransport({
        service : envVars.MAILER_SERVICE,
        auth : {
                user : envVars.MAILER_EMAIL,
                pass : envVars.MAILER_SECRET_KEY
        }
        //todo attachments
        //todo host
        //todo secure
        //todo from
    });


    async sendEmail ({to, subject, htmlBody, attachments = []} : IEmailService) : Promise<boolean>{


        //enviamos el email
        try {
            const resp =  await this.transporter.sendMail({
                 to,
                 subject, 
                 html : htmlBody,
                 attachments
             });

            //  console.log(resp);
             console.log('Email enviado correctamente!');
             
             return true;
            
        } catch (error) {
            console.log('Error enviando en mail : ',error);
            return false;
        }
    }

    async sendLogsEmail (to : string | string[]){
        const nombreLog = 'low-logs.log';
        const mailInfo : IEmailService = {
            to,
            subject : 'prueba de mail NOC', 
            htmlBody : '<h1>Titulo</h1><p>cuerpo del mensaje</p>', 
            attachments : [{
                filename : `${nombreLog}`,
                path : `logs/${nombreLog}`
            }]
        }
        try {
            return await this.sendEmail(mailInfo);
            
        } catch (error) {
           return false; 
        }
    }
}