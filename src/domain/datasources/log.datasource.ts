import { SeverityLogLevel } from "@prisma/client";
import { LogEntity } from "../entity/log.entity"


export abstract class LogDatasource {
        abstract saveLog (log : LogEntity) : Promise<void>
        abstract getLogs ( level : SeverityLogLevel) : Promise<LogEntity[]>
}