const { find_documents, find_distinct_documents, insert_document, update_document } = require('./queries');

const COL_RESOURCES = process.env.COL_RESOURCES;
const COL_WORKSPACES = process.env.COL_WORKSPACES;

const find_categories = (_, res) => {
  const key = 'category';
  const filter = {};
  find_distinct_documents(COL_RESOURCES, key, filter, res);
};

const find_topics = (req, res) => {
  const key = 'topic';
  const filter = {
    category: req.params.category,
  };
  find_distinct_documents(COL_RESOURCES, key, filter, res);
};

const find_topic = (req, res) => {
  const { category, topic } = req.params;
  const query = {
    category: category,
  };
  if (topic !== 'all') {
    query.topic = topic;
  }
  find_documents(COL_RESOURCES, res, query);
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
  const topic = req.body.topic.toLowerCase();
  const query = { url, category, topic };
  insert_document(COL_RESOURCES, query, res);
};

const create_workspace = (req, res) => {
  const { id, title, description } = req.body;
  const query = { id, title, description };
  insert_document(COL_WORKSPACES, query, res);
};

const update_content = (req, res) => {
  const { id, content } = req.body;
  const filter = {
    id: parseInt(id),
  };
  const query = {
    $set: {
      content,
    },
  };
  update_document(COL_WORKSPACES, filter, query, res);
};

module.exports = {
  find_categories,
  find_topics,
  find_topic,
  find_workspaces,
  find_workspace,
  add_resource,
  create_workspace,
  update_content,
};
