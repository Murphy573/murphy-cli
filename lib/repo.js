const REPO_MAPPER = {
  B: "github:Murphy573/vue-admin-template",
  C: "github:Murphy573/vue-h5-template",
  P: "github:Murphy573/vue-package-template",
};

exports.getRepo = (key) => {
  if (!key) return "";

  return REPO_MAPPER[key];
};
