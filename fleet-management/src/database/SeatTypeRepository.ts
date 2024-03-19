import { DataTypeOIDs, Pool} from 'postgresql-client';
import {PoolFactory} from "./Pool";
import {SeatType} from "./SeatType";

export class SeatTypeRepository{

    private static pool = new Pool({
        user: 'fleetops_user',
        host: 'localhost',
        database: '',
        password: 'S3cret',
        port: 5432,
    })

    async fetch(): Promise<SeatType[]> {
        const result = await PoolFactory.pool.query('select * from seat_type');
        let seatTypes: SeatType[] = [];
        let rows = result?.rows;

        if (!rows) {
            return [];
        }
        for (const row of rows) {
            console.log(row)
            seatTypes.push(row as SeatType);
        }

        return seatTypes;
    }

    async insert(seatType: SeatType) {
        const statement = await PoolFactory.pool.prepare(
            'insert into seat_type(id, body) values ($1, $2) on conflict (id) do update set body=$2',
            {
                paramTypes: [DataTypeOIDs.varchar, DataTypeOIDs.json]
            });

        await statement.execute({params: [seatType.id, seatType]});

        return [seatType]
    }

    async delete(id: string) {
        const statement = await PoolFactory.pool.prepare(
            'delete from seat_type where id=($1)', {
                paramTypes: [DataTypeOIDs.varchar]
            });

        await statement.execute({params: [id]});

        return [id]
    }
}