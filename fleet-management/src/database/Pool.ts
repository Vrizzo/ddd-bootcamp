import {DataTypeOIDs, Pool} from "postgresql-client";
import {Aircraft} from "./Aircraft";

export class PoolFactory {

    public static pool = new Pool({
        user: 'fleetops_user',
        host: 'localhost',
        database: '',
        password: 'S3cret',
        port: 5432,
    })

}