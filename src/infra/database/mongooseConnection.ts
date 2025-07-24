import mongoose from "mongoose";
import 'dotenv/config'


export async function connectMongo(uri: string){
    try{
        await mongoose.connect(uri);
        console.log('Mongo Atlas conectado');
    }catch(e){
        console.error('falha na conexão mongo', e);
        process.exit(1);
    }
}