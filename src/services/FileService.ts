import multer from 'multer';

class FileService {
    public createStore() {
        const storage = multer.diskStorage({
            destination: (_, __, cb) => {
                cb(null, 'uploads');
            },
            filename: (_, file, cb) => {
                cb(null, file.originalname);
            }
        });

        const upload = multer({ storage });

        return upload;
    }
}

export default new FileService();
