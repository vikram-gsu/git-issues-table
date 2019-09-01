import { fetchIssues } from "../api/issues";

const mockResponses = [
  {
    number: 16630,
    title: "Chrome Extension Background Page and useEffect Not Triggered",
    labels: [
      {
        "id": 196858374,
        "node_id": "MDU6TGFiZWwxOTY4NTgzNzQ=",
        "url": "https://api.github.com/repos/facebook/react/labels/CLA%20Signed",
        "name": "CLA Signed",
        "color": "e7e7e7",
        "default": false
      },
      {
        "id": 1296748300,
        "node_id": "MDU6TGFiZWwxMjk2NzQ4MzAw",
        "url": "https://api.github.com/repos/facebook/react/labels/React%20Flare",
        "name": "React Flare",
        "color": "63f2ff",
        "default": false
      }
    ],
    state: "open",
    created_at: "August 31, 2019, 10:31:51 EDT",
    updated_at: "August 31, 2019, 10:39:19 EDT"
  },
  {
    number: 16629,
    title: "Can't use instance values without refs",
    labels: [],
    state: "open",
    created_at: "August 31, 2019, 10:31:51 EDT",
    updated_at: "August 31, 2019, 10:39:19 EDT"
  }

];
describe("api.issues", () => {
  beforeEach(function() {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true,
          status:200,
          json: function() {
            return {"issues": mockResponses};
          }
        });
      });

      return p;
    });
  });

  it("fetches issues as expected", async function() {
    const response = await fetchIssues();

    expect(response.status).toBe(200);
    expect(response.data.issues).toHaveLength(2);
  });
});
