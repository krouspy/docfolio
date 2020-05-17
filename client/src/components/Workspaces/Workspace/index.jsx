import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const { workspaceId } = useParams();

  useEffect(() => {
    const url = `http://localhost:3000/api/`;
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 300 }}>
      <h1>Project</h1>
    </div>
  );
};
