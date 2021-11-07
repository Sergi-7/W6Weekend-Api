const Robot = require("../../database/models/robot");
const {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
  deleteRobotById,
} = require("./robotsController");

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

describe("Given a getRobotById function", () => {
  describe("When it receives a request with and id 1, a res object and a next function", () => {
    test("Then it should invoke Robot.findById with a 1", async () => {
      Robot.findById = jest.fn().mockResolvedValue({});
      const idRobot = 1;
      const req = {
        params: {
          idRobot,
        },
      };

      const res = {
        json: () => {},
      };
      const next = () => {};

      await getRobotById(req, res, next);

      expect(Robot.findById).toHaveBeenCalledWith(idRobot);
    });
  });
  describe("And Robot.findById rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const error = {};
      Robot.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(404);
    });
  });

  describe("And Robot.findById resolves to r2d2", () => {
    test("Then it should invoke res.json with r2d2", async () => {
      const id = 1;
      const r2d2 = {
        id,
        name: "r2d2",
        image: "r2d2.org",
        stats: {
          speed: 3,
          stamina: 3,
          date: "131313",
        },
      };
      Robot.findById = jest.fn().mockResolvedValue(r2d2);
      const req = {
        params: {
          id,
        },
      };
      const res = {
        json: jest.fn(),
      };

      await getRobotById(req, res);

      expect(res.json).toHaveBeenCalledWith(r2d2);
    });
  });
});

describe("Given a createRobot function", () => {
  describe("When it receives a request ", () => {
    test("Then it should return a response with the new robot", async () => {
      const res = {
        json: jest.fn(),
      };

      const r2d2 = {
        id: 1,
        name: "r2d2",
        image: "r2d2.org",
        stats: {
          speed: 3,
          stamina: 3,
          date: "131313",
        },
      };
      const req = { body: r2d2 };
      Robot.create = jest.fn().mockResolvedValue(r2d2);

      await createRobot(req, res, null);

      expect(Robot.create).toHaveBeenCalledWith(r2d2);
      expect(res.json).toHaveBeenCalledWith(r2d2);
    });
  });
  describe("When it is invoked and it rejects", () => {
    test("Then it should invoke next with an error", async () => {
      const error = {};
      Robot.create = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 1,
        },
      };

      const res = {};
      const next = jest.fn();

      await createRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});

describe("Given an updateRobot function", () => {
  describe("When it is invoked with a request with an id and an updated robot", () => {
    test("Then it should return a res.json with the updated robot", async () => {
      const res = {
        json: jest.fn(),
      };

      const r2d2 = {
        _id: 1,
        name: "r2d2",
        image: "r2d2.org",
        stats: {
          speed: 3,
          stamina: 3,
          date: "131313",
        },
      };
      const req = { body: r2d2 };
      Robot.findByIdAndUpdate = jest.fn().mockResolvedValue(r2d2);

      await updateRobot(req, res, null);

      expect(Robot.findByIdAndUpdate).toHaveBeenCalledWith(r2d2._id, r2d2);
    });
  });
  describe("When it is invoked an it rejects", () => {
    test("Then it should call next with an error", async () => {
      const error = {};
      Robot.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      const r2d2 = {
        _id: 1,
        name: "r2d2",
        image: "r2d2.org",
        stats: {
          speed: 3,
          stamina: 3,
          date: "131313",
        },
      };
      const req = { body: r2d2 };
      const res = {};
      const next = jest.fn();

      await updateRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});

describe("Given a deleteRobotById function", () => {
  describe("When it is invoked with a request including an id", () => {
    test("Then it should return the deleted robot in res.json", async () => {
      const res = {
        json: jest.fn(),
      };

      const r2d2 = {
        id: 1,
        name: "r2d2",
        image: "r2d2.org",
        stats: {
          speed: 3,
          stamina: 3,
          date: "131313",
        },
      };

      Robot.findByIdAndDelete = jest.fn().mockResolvedValue(r2d2);
      const req = { params: { idRobot: r2d2.id } };

      await deleteRobotById(req, res, null);

      expect(Robot.findByIdAndDelete).toHaveBeenCalledWith(r2d2.id);
      expect(res.json).toHaveBeenCalledWith({ delete: r2d2 });
    });
  });
});
