import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Section from './Section';
import CreateSection from './CreateSection';
import Editable from './Editable';
import SaveButton from './SaveButton';
import { useSnackbar } from '#customHooks';
import Snackbar from '#snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      color: 'white',
      margin: theme.spacing(1, 0),
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
  const [data, setData] = useState({
    title: '',
    description: '',
    sections: [],
  });
  // save initial workspace state to compare if there's any changes to toggle save button
  const [save, setSave] = useState({
    title: '',
    description: '',
  });
  const [snackbar, toggleSnackbar] = useSnackbar();

  useEffect(() => {
    const url = `http://localhost:3000/api/workspace/${workspaceId}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const result = response.result[0];
        setData(result);
        setSave(result);
      })
      .catch(error => console.log(error));
  }, []);

  const updateHeaders = event => {
    const { name, value } = event.target;
    setData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createSection = () => {
    const url = `http://localhost:3000/api/createSection`;
    const newSection = {
      position: data.sections.length,
      content: '## Edit me!',
    };
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: workspaceId,
        section: newSection,
      }),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        const { statusCode } = response;
        toggleSnackbar('Create section', statusCode !== 200);
        if (statusCode === 200) {
          setData(prevState => {
            const sections = prevState.sections;
            return {
              ...prevState,
              sections: [...sections, newSection],
            };
          });
        }
      })
      .catch(error => console.error(error));
  };

  const updateSave = () => {
    setSave(data);
  };

  const checkHeadersChanges = () => {
    return data.title !== save.title || data.description !== save.description;
  };

  const update = checkHeadersChanges();

  const { title, description, sections } = data;

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
        {update && (
          <SaveButton data={data} updateSave={updateSave} toggleSnackbar={toggleSnackbar} />
        )}
      </Paper>
      {sections.map((section, index) => {
        return (
          <Section
            key={index}
            section={section}
            workspaceId={workspaceId}
            toggleSnackbar={toggleSnackbar}
            setData={setData}
          />
        );
      })}
      <CreateSection
        createSection={createSection}
        workspaceId={workspaceId}
        toggleSnackbar={toggleSnackbar}
      />
      <Snackbar
        open={snackbar.open}
        toggle={toggleSnackbar}
        text={snackbar.text}
        error={snackbar.error}
      />
    </div>
  );
};
