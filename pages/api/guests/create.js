import {MongoClient} from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.DB_HOST_ATLAS);
    await client.connect();

    const db = client.db(process.env.DB_NAME_ATLAS);

    const insert = await db.collection('pdf').insertOne({
        template: "PDF Template 2",
        paper: "A4",
        orientation: "Portrait",
        plugins: "anywhere2-dompdf",
        version: "0.8.5"
    });

    res.status(200).json({
        ack: insert.acknowledged,
        insertedId: insert.insertedId,
    });
}
