import axios from "axios";

jest.mock("axios");

describe("oauth2", () => {
  it("successfully hits oauth2 endpoint", () => {
    const data = {
      data: {
        hits: [
          {
            objectID: "1",
            title: "a",
          },
          {
            objectID: "2",
            title: "b",
          },
        ],
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
  });
  it("erroneously hits oauth2 endpoint", () => {
    const error = "Network Error";
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(error)));
  });
});
