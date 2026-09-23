import clientPromise from '../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const year = Number(req.query.year) || 2569;
    const quarter = Number(req.query.quarter) || 3;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || 'pwa_gis');
    const collection = db.collection(process.env.MONGODB_COLLECTION || 'metrics');

    const records = await collection.find({
      fiscal_year: year,
      quarter: quarter
    }).toArray();

    return res.status(200).json({ records });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
