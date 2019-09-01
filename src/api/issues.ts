function fetchIssues() {
  return fetch("https://api.github.com/repos/facebook/react/issues", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {

        return {status: response.status, statusText: response.statusText, data: response.json()};
      } else {
        return({status: response.status, statusText: response.statusText, data: []});
      }
    })
    .catch(error => {
      throw new Error(
        "Network Error: Error while processing the API request for Github issues"
      );
    });
};

export { fetchIssues };
