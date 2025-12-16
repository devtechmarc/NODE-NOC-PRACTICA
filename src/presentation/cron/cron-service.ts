import { CronJob } from 'cron';

type Time = string | Date;
type OnTick = () => void //el callback que se ejecuta 


// con el patron adaptador hacemos que sea más facil cambiar de libreria de crons en caso de necesitarlo
export class CronService {

    static createJob = (time : Time, onTick : OnTick ) : CronJob => {
        return new CronJob(
            time,
            onTick, // onTick
            null, // onComplete
            true, // start
        );

    }

}