import { SeverityLogLevel } from "@prisma/client"
import { LogEntity } from "../entity/log.entity"



export abstract class LogRepository {

   abstract saveLog (log : LogEntity) : Promise<void>
   abstract getLog (level : SeverityLogLevel) : Promise<LogEntity[]>
}