import { PrismaClient, SeverityLogLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entity/log.entity";


export class PostgresSQLLogDatasource extends LogDatasource {

     readonly prisma = new PrismaClient();


    async saveLog(log: LogEntity): Promise<void> {
        await this.prisma.log.create({
            data : {
                ...log
            }
        })
    }
    async getLogs(level: SeverityLogLevel): Promise<LogEntity[]> {
       return  await this.prisma.log.findMany({
            where : {
                level 
            }
        })
    }

}