const { notFoundErrorHandler, generalErrorHandler } = require("./errors");

describe("Given a notFoundErrorHandler", () => {
  describe("When it receives an object res", () => {
    test("Then it should call the method status with code 404 and json and object with 'Endpoint not found' ", () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      notFoundErrorHandler(null, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Endpoint not found" });
    });
  });
});

describe("Given a generalErrorHandler", () => {
  describe("When it receives and object error and an object res", () => {
    test("Then it should invoke the method status with a code and json with a message", () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      const error = { code: 403, message: "General Error" };

      generalErrorHandler(error, null, res);

      expect(res.status).toHaveBeenCalledWith(error.code);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
});
