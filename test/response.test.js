const { genericResponse } = require("../utils");

const expected = {};
describe("returns an object", () => {
  test("returns true if api response is an object", () => {
    expect(genericResponse()).toMatchObject(expected);
  });

  test("returns true if api response structure has responseMessage key", () => {
    expect(Object.keys(genericResponse())).toEqual(
      expect.arrayContaining(["responseMessage"])
    );
  });
  test("returns true if api response structure has responseCodes key", () => {
    expect(Object.keys(genericResponse())).toEqual(
      expect.arrayContaining(["responseCode"])
    );
  });
  test("returns true if api response structure has data key", () => {
    expect(Object.keys(genericResponse())).toEqual(
      expect.arrayContaining(["data"])
    );
  });
});
