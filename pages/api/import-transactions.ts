import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import mysql from 'mysql2/promise';
import csv from 'csv-parser';
import { Readable } from 'stream';

interface Transaction {
  Date: string;
  Description: string;
  Category: string;
  Cost: string;
  Currency: string;
  'Love Ahir': string;
  'Kush Ahir': string;
  'Pranam Shetty': string;
  'Dhairya Dutt': string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const results: Transaction[] = [];
    const stream = Readable.from(req.body);
    stream
      .pipe(csv())
      .on('data', (data: Transaction) => results.push(data))
      .on('end', async () => {
        console.log(`Parsed ${results.length} rows from CSV`);
        let insertedCount = 0;

        for (const row of results) {
          if (!row.Date || !row.Description) {
            console.log('Skipping row due to missing Date or Description');
            continue;
          }

          const participants = ['Love Ahir', 'Kush Ahir', 'Pranam Shetty', 'Dhairya Dutt'];
          for (const participant of participants) {
            const amount = parseFloat(row[participant as keyof Transaction]);
            if (isNaN(amount) || amount === 0) {
              console.log(`Skipping ${participant} for row ${row.Date} - ${row.Description} due to invalid amount`);
              continue;
            }

            const [userRows] = await connection.execute(
              'SELECT id FROM users WHERE CONCAT(first_name, " ", last_name) = ?',
              [participant]
            ) as any;

            if (userRows.length === 0) {
              console.error(`User ${participant} not found`);
              continue;
            }

            const userId = userRows[0].id;

            try {
              await connection.execute(
                'INSERT INTO transactions (user_id, group_name, amount, description, category, date, currency) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [userId, 'Park Point', amount, row.Description, row.Category, new Date(row.Date), row.Currency]
              );
              insertedCount++;
            } catch (error) {
              console.error(`Error inserting transaction for ${participant}:`, error);
            }
          }
        }

        console.log(`Inserted ${insertedCount} transactions`);
        res.status(200).json({ message: `Transactions imported successfully. Inserted ${insertedCount} transactions.` });
      });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ message: 'Error importing transactions' });
  } finally {
    await connection.end();
  }
}