// /src/App.tsx

import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';

const AppWrapper = styled.div`
  padding: 20px;
`;

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [updateList, setUpdateList] = useState(0);

  const toggleForm = () => setShowForm(!showForm);
  const refreshList = () => setUpdateList(updateList + 1);

  return (
    <AppWrapper>
      <GlobalStyle />
      <button onClick={toggleForm}>
        {showForm ? 'Hide Form' : 'Add Task'}
      </button>
      {showForm && <TaskForm onSubmit={refreshList} />}
      <TaskList key={updateList} />
    </AppWrapper>
  );
};

export default App;
