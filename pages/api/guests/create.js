import {MongoClient} from 'mongodb';

export default async function handler(req, res) {

    //parameters
    let body = req.body;
    let query = req.query;
    let headers = req.headers;

    //validations: customize here
    if (body.nama_perumahan === '') {
        res.status(400).json({
            error: `Nama perumahan harus dilengkapi`,
        });
        return false;
    }
    if (body.nama_tamu === '') {
        res.status(400).json({
            error: `Nama tamu harus dilengkapi`,
        });
        return false;
    }
    if (query.tipe_tamu === '') {
        res.status(400).json({
            error: `Tipe tamu harus dilengkapi`,
        });
        return false;
    }
    if (body.alamat_rumah === {}) {
        res.status(400).json({
            error: `Alamat rumah harus dilengkapi`,
        });
        return false;
    }

    //controller logic
    const client = new MongoClient(process.env.DB_HOST_ATLAS);
    await client.connect();

    const db = client.db(process.env.DB_NAME_ATLAS);

    const insert = await db.collection('guests').insertOne({
        nama_perumahan: body.nama_perumahan,
        tanggal_masuk: new Date().toISOString(),
        tanggal_keluar: null,
        nama_tamu: body.nama_tamu,
        tipe_tamu: query.tipe_tamu,
        alamat_rumah: body.alamat_rumah
    });

    res.status(200).json({
        ack: insert.acknowledged,
        insertedId: insert.insertedId,
    });
}
