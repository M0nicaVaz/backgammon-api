import express from 'express';
import { prisma } from './database/db';
import multerConfig from './configs/upload';
import DiskStorage from './providers/DiskStorage';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/files', express.static(multerConfig.UPLOADS_FOLDER));

app.use('/', multerConfig.upload.single('avatar'));

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      avatar: true,
      country: true,
    },
  });

  return res.json(users);
});

app.post('/users', async (req, res) => {
  const body = req.body;
  const avatarFilename = req.file?.filename;

  const userExists = await prisma.user.findFirst({
    where: {
      name: body.name,
    },
  });

  if (userExists) {
    console.log('Já existe um jogador com esse nome.');
    return res.status(400).json();
  }

  const diskStorage = new DiskStorage();
  const imageSaved = avatarFilename
    ? await diskStorage.saveFile(avatarFilename)
    : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';

  const user = await prisma.user.create({
    data: {
      name: body.name,
      avatar: imageSaved,
      country: body.country,
    },
  });

  return res.status(201).json(user);
});

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return res.status(200).json();
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Running');
});
