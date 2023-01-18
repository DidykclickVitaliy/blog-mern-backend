import { Request, Response } from 'express';

class FileController {
    public uploadFile(request: Request, response: Response) {
        response.json({
            url: `/uploads/${request.file?.originalname}`
        });
    }
}

export default new FileController();
