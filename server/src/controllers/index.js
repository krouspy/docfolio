const { find_documents, find_distinct_documents, insert_one } = require('./queries');

const COL_RESOURCES = process.env.COL_RESOURCES;
const COL_WORKSPACES = process.env.COL_WORKSPACES;

const find_category = (req, res) => {
  const query = {
    category: req.params.category,
  };
  find_documents(COL_RESOURCES, res, query);
};

const find_categories = (_, res) => {
  find_distinct_documents(COL_RESOURCES, res);
};

const find_workspaces = (_, res) => {
  const query = {};
  find_documents(COL_WORKSPACES, res, query);
};

const add_resource = (req, res) => {
  const { url } = req.body;
  const category = req.body.category.toLowerCase();
  const query = { url, category };
  insert_one(COL_RESOURCES, query, res);
};

const create_project = (req, res) => {
  const { id, title, description } = req.body;
  const query = { id, title, description };
  insert_one(COL_WORKSPACES, query, res);
};

module.exports = {
  find_category,
  find_categories,
  find_workspaces,
  add_resource,
  create_project,
};
