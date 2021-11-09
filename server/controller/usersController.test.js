const bcrypt = require("bcrypt");
const User = require("../../database/models/user");
const loginUser = require("./usersController");

jest.mock("../../database/models/user");
jest.mock("bcrypt");
require("dotenv").config();

describe("Given a loginUser function", () => {
  describe("When it receives a request with a username and a password", () => {
    test("Then it should invoke User.findOne with the username", async () => {
      User.findOne = jest
        .fn()
        .mockResolvedValue({ name: "Sergi", username: "Sergi" });

      const username = "Sergi";
      const req = {
        body: {
          username,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      await loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith(username);
    });
  });
  describe("When it receives");
});
