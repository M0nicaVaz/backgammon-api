import express from 'express';
import { prisma } from './database/db';

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      avatar: true,
      country: true,
    },
  });

  return res.json(users);
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
