import { SeverityLogLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entity/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository{

    //hacemos la Inyeccion de dependencias de los datasources
    constructor (
        private readonly logDatasource : LogDatasource // cuando generemos una instancia de esta clase, tendremos que pasarle el datasource que queramos (oracle, filesystem, mongodb etc)
    ){}

    saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }
    getLog(level: SeverityLogLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(level);
    }

}