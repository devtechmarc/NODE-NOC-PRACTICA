import { SeverityLogLevel } from '@prisma/client';
import { LogEntity } from '../../entity/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { EmailService } from './../../../presentation/email/email-service';
export interface ISendLogs {
    execute : (to : string | string[]) => Promise<boolean>
}


export class SendLogs implements ISendLogs{

    constructor(
        private readonly emailService : EmailService,
        private readonly logRepository : LogRepository,
    ){}

    async execute(to : string | string[]) : Promise<boolean>{
        
        try {
            const resp = await this.emailService.sendLogsEmail(to);
            resp ?
            this.logRepository.saveLog(new LogEntity( SeverityLogLevel.LOW, 'Correo con los logs enviados correctamente', 'email-service.ts', )) 
            :
            new LogEntity( SeverityLogLevel.HIGH, 'Error al enviar por correo los logs', 'email-service.ts', );
            return true;
        } catch (error) {
            new LogEntity( SeverityLogLevel.HIGH, 'Error al enviar por correo los logs', 'email-service.ts', );
            return false;
        }
    }
    
}