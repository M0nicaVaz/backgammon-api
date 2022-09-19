import { promises } from 'fs';
import path, { resolve } from 'path';
import fs from 'fs';
import uploadConfig from '../configs/upload';

class DiskStorage {
  async saveFile(file: string) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );
    return file;
  }

  async deleteFile(file: string) {
    const filePath = resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await promises.stat(filePath);
    } catch {
      return;
    }

    await promises.unlink(filePath);
  }
}

export default DiskStorage;
