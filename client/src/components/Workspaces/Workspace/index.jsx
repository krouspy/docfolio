import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Section from './Section';
import CreateSection from './CreateSection';
import Editable from './Editable';
import SaveButton from './SaveButton';
import Snackbar from '#snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      color: 'white',
      margin: theme.spacing(2, 0),
      padding: theme.spacing(2),
      backgroundColor: '#272c34',
    },
  },
  head: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default () => {
  const classes = useStyles();
  const { workspaceId } = useParams();
  const [sections, setSections] = useState([]);
  const [headers, setHeaders] = useState({
    title: '',
    description: '',
  });
  // save initial workspace state to compare if there's any changes to toggle save button
  const [save, setSave] = useState({
    title: '',
    description: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    messageSuccess: '',
    messageError: '',
  });

  useEffect(() => {
    const url = `http://localhost:3000/api/workspace/${workspaceId}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const result = response.result[0];
        setSections(result.sections);
        delete result.sections;
        setHeaders(result);
        setSave(result);
      })
      .catch(error => console.log(error));
  }, []);

  const toggleSnackbar = () => {
    setSnackbar(prevState => ({
      ...prevState,
      open: !prevState.open,
    }));
  };

  const updateHeaders = event => {
    const { name, value } = event.target;
    setHeaders(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateSection = (event, index) => {
    const { name, value } = event.target;
    setSections(prevState => {
      return prevState.map((element, pos) =>
        index === pos ? { ...element, [name]: value } : element
      );
    });
  };

  const updateSave = () => {
    setSave(headers);
  };

  const checkHeadersChanges = () => {
    return headers.title !== save.title || headers.description !== save.description;
  };

  const { title, description } = headers;
  const update = checkHeadersChanges();

  return (
    <div className={classes.root}>
      <Paper className={classes.head}>
        <Editable variant="h5" text={title} updateText={updateHeaders} name="title" />
        <Editable
          variant="subtitle1"
          text={description}
          updateText={updateHeaders}
          name="description"
        />
        {update && <SaveButton data={headers} updateSave={updateSave} setSnackbar={setSnackbar} />}
      </Paper>
      {(sections || []).map((section, index) => {
        const { title, content } = section;
        return (
          <Section
            key={index}
            title={title}
            content={content}
            updateSection={e => updateSection(e, index)}
          />
        );
      })}
      <CreateSection
        workspaceId={workspaceId}
        sections={sections}
        setSections={setSections}
        setSnackbar={setSnackbar}
      />
      <Snackbar
        open={snackbar.open}
        toggle={toggleSnackbar}
        messageSuccess={snackbar.messageSuccess}
        messageError={snackbar.messageError}
        error={snackbar.error}
      />
    </div>
  );
};
