import {Aircraft} from "./Aircraft";
import {DataTypeOIDs} from "postgresql-client";
import {PoolFactory} from "./Pool";

export class AircraftRepository{

    async fetch(): Promise<Aircraft[]> {
        const result = await PoolFactory.pool.query('select * from aircraft');
        let aircrafts: Aircraft[] = [];
        let rows = result?.rows;

        if (!rows) {
            return [];
        }
        for (const row of rows) {
            console.log(row)
            aircrafts.push(row as Aircraft);
        }

        return aircrafts;
    }

    async insert(aircraft: Aircraft) {
        const statement = await PoolFactory.pool.prepare(
            'insert into aircraft(id, body) values ($1, $2) on conflict (id) do update set body=$2',
            {
                paramTypes: [DataTypeOIDs.varchar, DataTypeOIDs.json]
            });

        await statement.execute({params: [aircraft.model, aircraft]});

        return [aircraft]
    }

    async delete(model: string) {
        const statement = await PoolFactory.pool.prepare(
            'delete from aircraft where id=($1)', {
                paramTypes: [DataTypeOIDs.varchar]
            });

        await statement.execute({params: [model]});

        return [model]
    }
}