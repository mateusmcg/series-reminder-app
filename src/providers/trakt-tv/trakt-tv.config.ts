export const TRAKT_TV_CONFIGS = {
    clientId: "b0193b6297b2e397aeef7b832872e50752eae47b10c809f8dec7b98f34aafab1",
    baseURL: "https://api.trakt.tv",
    headers: {
        contentType: "application/json",
        traktApiVersion: "2"
    }
}

// Here some basic example of query parameters that can be sent to the API:
    // Pagination:
        // page: 1 (Number of page of results to be returned)
        // limit: 10 (Number of results to return per page.)

    // Extended Info:
        // full (Complete info for an item.)
        // metadata (Collection only. Additional video and audio info.)