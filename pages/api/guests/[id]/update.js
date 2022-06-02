import {MongoClient, ObjectId} from 'mongodb';

export default async function handler(req, res) {

    //controller logic
    const client = new MongoClient(process.env.DB_HOST_ATLAS);
    await client.connect();

    const db = client.db(process.env.DB_NAME_ATLAS);

    const result = await db.collection('guests').updateOne({
        _id: new ObjectId(req.query.id)
    }, {
        $set: {
            tanggal_keluar: new Date().toISOString()
        },
    });

    return res.status(200).json({
        result: result,
        deleted: true,
        _id: req.query.id,
    });

}
