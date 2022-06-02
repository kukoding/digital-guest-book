import {MongoClient} from 'mongodb';

export default async function handler(req, res) {

    //parameters
    let body = req.body;
    let query = req.query;

    const client = new MongoClient(process.env.DB_HOST_ATLAS);
    await client.connect();

    const db = client.db(process.env.DB_NAME_ATLAS);

    //search filter
    let keywords = {};
    if (body.nama_perumahan !== '') {
        keywords.nama_perumahan = body.nama_perumahan;
    }

    const result = await db.collection('guests').find(keywords).toArray();

    res.status(200).json({
        guests: result,
    });

}
