import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => (
      setRepositories(response.data)
    ))
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      title: 'test',
      url: 'http://test.t',
      techs: ['Tech1', 'Tech2']
    }

    const response = await api.post('repositories', newRepository)

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    if (response.status !== 204) return

    const repositoryIndex = repositories.findIndex((repository => (
      repository.id === id
    )))

    const modifiedRepositories = [...repositories]

    modifiedRepositories.splice(repositoryIndex, 1)

    setRepositories(modifiedRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
