const Robot = require("../../database/models/robot");
const { getRobots } = require("./robotsController");

jest.mock("../../database/models/robot");

describe("Given a getRobots function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json", async () => {
      const robots = [
        { id: 1, name: "Itnas", image: "gasdgasgd" },
        { id: 1, name: "Santi", image: "gasdgasgd" },
      ];
      Robot.find = jest.fn().mockResolvedValue(robots);
      const res = {
        json: jest.fn(),
      };
      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
    });
  });
});
