import { resolve } from 'path';
import { randomBytes } from 'crypto';
import multer, { diskStorage } from 'multer';

const TMP_FOLDER = resolve(__dirname, '..', '..', 'tmp');
const UPLOADS_FOLDER = resolve(TMP_FOLDER, 'uploads');

const upload = multer({
  storage: diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
});

export default { TMP_FOLDER, UPLOADS_FOLDER, upload };
