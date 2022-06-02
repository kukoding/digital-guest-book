import {MongoClient, ObjectId} from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.DB_HOST_ATLAS);
    await client.connect();

    const db = client.db(process.env.DB_NAME_ATLAS);

    const result = await db.collection('guests').deleteOne({
        _id: new ObjectId(req.query.id)
    });

    return res.status(200).json({
        result: result,
        deleted: true,
        _id: req.query.id,
    });
}
