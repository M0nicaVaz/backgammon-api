import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get('/players', async (req, res) => {
  return res.json();
});

const PORT = process.env.PORT || 3333;
app.listen(PORT);
