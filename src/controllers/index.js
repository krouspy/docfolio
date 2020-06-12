const ObjectID = require('mongodb').ObjectID;
const {
  find_documents,
  find_distinct_documents,
  insert_document,
  update_document,
  find_headings_of_workspace,
  delete_document,
  authentication,
} = require('./queries');

const COL_RESOURCES = process.env.COL_RESOURCES;
const COL_WORKSPACES = process.env.COL_WORKSPACES;
const COL_USERS = process.env.COL_USERS;

const find_categories = (_, res) => {
  const key = 'categories';
  const filter = {};
  find_distinct_documents(COL_RESOURCES, key, filter, res);
};

const find_topics = (req, res) => {
  const key = 'topic';
  const filter = {
    categories: req.params.category,
  };
  find_distinct_documents(COL_RESOURCES, key, filter, res);
};

const find_topic = (req, res) => {
  const { category, topic } = req.params;
  const query = {
    categories: category,
  };
  if (topic !== 'all') {
    query.topic = topic;
  }
  find_documents(COL_RESOURCES, query, res);
};

const find_workspaces = (_, res) => {
  const query = {};
  find_documents(COL_WORKSPACES, query, res);
};

const find_workspace = (req, res) => {
  const query = {
    id: parseInt(req.params.workspaceId),
  };
  find_documents(COL_WORKSPACES, query, res);
};

const add_resource = (req, res) => {
  const { url } = req.body;
  const categories = req.body.categories.toLowerCase();
  const topic = req.body.topic.toLowerCase();
  const query = { url, categories, topic };
  insert_document(COL_RESOURCES, query, res);
};

const create_workspace = (req, res) => {
  const { id, title, description } = req.body;
  const query = { id, title, description, content: 'Edit me!', links: [] };
  insert_document(COL_WORKSPACES, query, res);
};

const get_headings = (req, res) => {
  const { workspaceId } = req.params;
  const query = {
    id: parseInt(workspaceId),
  };
  find_headings_of_workspace(COL_WORKSPACES, res, query);
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

const delete_resource = (req, res) => {
  const { id } = req.body;
  const query = {
    _id: new ObjectID(id),
  };
  delete_document(COL_RESOURCES, query, res);
};

const add_link_to_workspace = (req, res) => {
  const { id, url } = req.body;
  const filter = {
    id: parseInt(id),
  };
  const query = {
    $push: {
      links: url,
    },
  };
  update_document(COL_WORKSPACES, filter, query, res);
};

const login = (email, password, done) => {
  const query = {
    email,
  };
  authentication(COL_USERS, query, password, done);
};

const register_user = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const query = {
    firstname,
    lastname,
    email,
    password,
  };
  insert_document(COL_USERS, query, res);
};

module.exports = {
  find_categories,
  find_topics,
  find_topic,
  find_workspaces,
  find_workspace,
  get_headings,
  add_resource,
  create_workspace,
  update_content,
  delete_resource,
  add_link_to_workspace,
  register_user,
  login,
};
