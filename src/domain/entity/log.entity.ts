import { SeverityLogLevel } from "@prisma/client";



export class LogEntity {
    constructor(
        public level : SeverityLogLevel, 
        public message : string,
        public origin : string,
        public date : Date = new Date(),
    ){}

    static fromJsonToObject(json : string = '{}') : LogEntity{

        return JSON.parse(json)
    }

    static fromObjectToObject (object : {[key : string] : any}) : LogEntity {
        const {message, level, origin, date} = object;
        return new LogEntity(message, level, origin, date)
    }

}