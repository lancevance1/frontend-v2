const client = {
  source: "frontend-v2",
  version: "v1.0.5"
};

export default {
  version: client.version,
  api: {
    submitParams: client
  },
  cdn: {
    global: "https://penguin-stats.s3.ap-southeast-1.amazonaws.com"
  }
}