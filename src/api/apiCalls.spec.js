import * as jest from "jest-mock";
import * as apiCalls from "./apiCalls";

describe("ApiCalls", () => {
  describe("signup", () => {
    it("call /api/1.0/users", () => {
      const spy = jest.spyOn(global, "fetch").mockResolvedValue({});
      spy.mockRestore();
      apiCalls.signup({});
      expect(spy).toBeCalledTimes(1);
      expect(spy).toHaveBeenCalledWith("/api/1.0/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({}),
      });
    });

    it("return fetched data", async () => {
      global.fetch = jest.fn().mockResolvedValue({ status: "success" });
      const response = await apiCalls.signup();
      expect(response).toEqual({ status: "success" });
    });
  });
});
