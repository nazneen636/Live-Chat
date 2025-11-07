class apiResponse {
  constructor(statusCode, message, data) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.status =
      this.statusCode >= 200 && this.statusCode < 300 ? "ok" : "error";
  }
  static sendSuccess(res, statusCode, message, data) {
    return res
      .status(statusCode)
      .json(new apiResponse(statusCode, message, data));
  }
}
export default apiResponse;
