import { SeverityLogLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entity/log.entity";
import fs from 'fs'



export class FileSystemDatasource implements LogDatasource{

    private readonly folder = 'logs/';
    private readonly logFiles = [
                                `${this.folder}low-logs.log`,
                                `${this.folder}medium-logs.log`,
                                `${this.folder}high-logs.log`
                            ];

    constructor(){
        this.createFolderAndFile();
    }

    private createFolderAndFile() {

        if(!fs.existsSync(this.folder)){
            fs.mkdirSync(this.folder);
        }

        this.logFiles.forEach(log => {
            if(!fs.existsSync(this.folder)){
                fs.writeFileSync(log, '')
            }
        });
    }
    
    async saveLog (log : LogEntity) : Promise<void> {
        const logAsJson = JSON.stringify(log).concat('\n');
        
        fs.appendFileSync(this.logFiles[0], logAsJson);

        if(log.level === SeverityLogLevel.LOW) return;

        if(log.level === SeverityLogLevel.MEDIUM){
            fs.appendFileSync(this.logFiles[1], logAsJson);
        }else{
            fs.appendFileSync(this.logFiles[2], logAsJson);
        }

        
    }

    async getLogs (level: SeverityLogLevel) : Promise<LogEntity[]> {
        
        switch (level) {
            case SeverityLogLevel.LOW:
                return this.getLogsFromFile(this.logFiles[0])
            
            case SeverityLogLevel.MEDIUM:
                return this.getLogsFromFile(this.logFiles[0])

            case SeverityLogLevel.HIGH:
                return this.getLogsFromFile(this.logFiles[0])

            default: throw new Error('Log Level not defined')
        }
        
    }

    private getLogsFromFile (path : string) : LogEntity[]{
        return fs.readFileSync(this.logFiles[0], { encoding : 'utf-8'})
        .split('/n')
        .map(LogEntity.fromJsonToObject); //* Es la forma acortada de hacer it => LogEntity.fromJsonToObject(it)
        
    }

}