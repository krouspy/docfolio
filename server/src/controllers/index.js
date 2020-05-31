const { find_documents, find_distinct_documents, insert_document, update_document } = require('./queries');

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

const find_workspace = (req, res) => {
  const query = {
    id: parseInt(req.params.workspaceId),
  };
  find_documents(COL_WORKSPACES, res, query);
};

const add_resource = (req, res) => {
  const { url } = req.body;
  const category = req.body.category.toLowerCase();
  const query = { url, category };
  insert_document(COL_RESOURCES, query, res);
};

const create_workspace = (req, res) => {
  const { id, title, description } = req.body;
  const query = { id, title, description };
  insert_document(COL_WORKSPACES, query, res);
};

const create_section = (req, res) => {
  const { id, section } = req.body;
  const filter = { id: parseInt(id) };
  const query = {
    $push: {
      sections: section,
    },
  };
  update_document(COL_WORKSPACES, filter, query, res);
};

const update_headers = (req, res) => {
  const { id, title, description, section } = req.body;
  const filter = { id: parseInt(id) };
  const query = {
    $set: {
      title,
      description,
      section,
    },
  };
  update_document(COL_WORKSPACES, filter, query, res);
};

const update_one_section = (req, res) => {
  const { id, section } = req.body;
  const { position, content } = section;
  const filter = { 'id': parseInt(id), 'sections.position': parseInt(position) };
  const query = {
    $set: {
      'sections.$.content': content,
    },
  };
  update_document(COL_WORKSPACES, filter, query, res);
};

module.exports = {
  find_category,
  find_categories,
  find_workspaces,
  find_workspace,
  add_resource,
  create_workspace,
  create_section,
  update_headers,
  update_one_section,
};
