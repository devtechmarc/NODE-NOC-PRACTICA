import { envVars } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo/init';
import {Server} from './presentation/server'



const main = async() => {

    Server.start();
    await MongoDatabase.connect(
        { url : envVars.MONGO_URL, dbName : envVars.MONGO_DB_NAME}).catch((err) => {throw new Error ('No se ha podido conectar a la bbdd ' + err)});

}



(async () => {
    await main();
})();