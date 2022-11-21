class FileController {
  async uploadFile(request, response) {
    response.json({
      url: `/uploads/${request.file.originalname}`,
    });
  }
}

export default new FileController();
