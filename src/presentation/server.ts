import { CronService } from './cron/cron-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple.use-case';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from './email/email-service';
import { SendLogs } from '../domain/use-cases/email/send-logs';
import { PostgresSQLLogDatasource } from '../infrastructure/datasources/postgresql.datasource';
import { SeverityLogLevel } from '@prisma/client';
import { MongoDatasource } from '../infrastructure/datasources/mongo.datasource';



const logRepositories : LogRepositoryImpl[] = [
    new LogRepositoryImpl(new FileSystemDatasource()),
    new LogRepositoryImpl(new MongoDatasource()),
    new LogRepositoryImpl(new PostgresSQLLogDatasource()),

]
const emailService : EmailService = new EmailService();


export class Server {



    
    static start = (url : string = "www.google.com") => {
        // new SendLogs(emailService, logRepository).execute('dev.tech.marc@gmail.com');
        
        CronService.createJob('*/2 * * * * *', () => {
        new CheckServiceMultiple(
            logRepositories,
            () => console.log(`checking url: ${url} : OK`),
            (err) => {console.log(`checking url: ${url} : KO`)},
            
        ).execute(url)
        })
        
    }
    static async test (){
        // console.log( await logRepository.getLog(SeverityLogLevel.HIGH));
    }
}


