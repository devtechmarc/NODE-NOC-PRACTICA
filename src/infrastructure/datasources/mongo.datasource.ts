import { SeverityLogLevel } from "@prisma/client";
import { LogModel } from "../../data/mongo/models/log.model";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entity/log.entity";


export  class MongoDatasource extends LogDatasource {
    
    
    async saveLog(log: LogEntity): Promise<void> {
        const logToCommit = await LogModel.create(log).catch(err => {throw new Error('No se ha podido crear el model del log. MongoDatasource' + err)} );

        logToCommit.save().catch(err => { throw new Error('No se ha podido guardar el log en bbdd' +  err)});
    }

    async getLogs(level: SeverityLogLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({ level }).catch( err => { throw new Error ('No se ha podido realizar la consulta del log ' + err)});
        return logs.map( LogEntity.fromObjectToObject);
    }

}