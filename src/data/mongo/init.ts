import mongoose from 'mongoose';

//Aqui vamos a crear la conexion a BBDD mongoDB

interface MongoDBOptions{
    url : string, 
    dbName : string
}

export class MongoDatabase {

    static async connect({url, dbName} : MongoDBOptions) : Promise<void> {
        
        try {
            const mongoResp = await mongoose.connect(url, {
                dbName
            });

            ('MongoDB connected');
            (mongoResp);
            
            
        } catch (error) {
            throw new Error('Error connecting MongoDB: ' + error)
        }
        
    }
}


