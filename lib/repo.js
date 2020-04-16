const REPO_MAPPER = {
  B: 'github:Murphy573/vue-admin-template',
  C: 'github:Murphy573/frontend-study',
};

exports.getRepo = key => {
  if (!key) return '';

  return REPO_MAPPER[key];
};
