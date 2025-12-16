import { SeverityLogLevel } from "@prisma/client";
import { LogEntity } from "../../entity/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface ICheckService {
    execute :  (url : string) => Promise<Boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = ( error : string) => void


export class CheckService implements ICheckService {

    constructor(
        private readonly logRepository : LogRepository,
        private readonly successClb : SuccessCallback,
        private readonly errorClb : ErrorCallback
    ){}

     execute = async (url : string) : Promise<Boolean> => {
        try {
            const resp = await fetch(url);

            if (!resp.ok){
                this.logRepository.saveLog(new LogEntity(SeverityLogLevel.HIGH, `Error on check service ${url}`, 'CheckService'))
                throw new Error (`Error on check service ${url}`);
            }

            this.logRepository.saveLog(new LogEntity(SeverityLogLevel.LOW, `Ping to ${url}: OK`, 'CheckService'));
            this.successClb();

            return true
        } catch (error ) {
            this.logRepository.saveLog(new LogEntity(SeverityLogLevel.HIGH, `${error}`, 'CheckService'))
            this.errorClb(`${error}`)
            return false;
        }
    }
}