import { useState, useEffect } from 'react'
import axios from 'axios';
import ModernLayout from './components/ModernLayout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import TimeEntries from './pages/TimeEntries'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedDeveloper, setSelectedDeveloper] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState('Todos')
  
  // Estados vazios que serão preenchidos pela API
  const [projects, setProjects] = useState([])
  const [developers, setDevelopers] = useState([])
  const [timeEntries, setTimeEntries] = useState([])
  const [loading, setLoading] = useState(true)

  // Buscar dados iniciais da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Buscar todos os dados em paralelo
        const [projectsRes, developersRes, timeEntriesRes] = await Promise.all([
          axios.get('/api/projects'),
          axios.get('/api/developers'),
          axios.get('/api/time-entries')
        ]);
        
        setProjects(projectsRes.data);
        setDevelopers(developersRes.data);
        setTimeEntries(timeEntriesRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funções para atualizar dados após operações
  const handleCreateProject = async (newProject) => {
    try {
      const response = await axios.post('/api/projects', newProject);
      setProjects(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      throw error;
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`/api/projects/${projectId}`);
      setProjects(prev => prev.filter(project => project.id !== projectId));
      // Remover time entries associados no estado local
      setTimeEntries(prev => prev.filter(entry => entry.project_id !== projectId));
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
      throw error;
    }
  };

  const handleCreateDeveloper = async (newDeveloper) => {
    try {
      const response = await axios.post('/api/developers', newDeveloper);
      setDevelopers(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar desenvolvedor:", error);
      throw error;
    }
  };

  const handleCreateTimeEntry = async (newTimeEntry) => {
    try {
      const response = await axios.post('/api/time-entries', newTimeEntry);
      setTimeEntries(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar lançamento:", error);
      throw error;
    }
  };

  const handleDeleteTimeEntry = async (entryId) => {
    try {
      await axios.delete(`/api/time-entries/${entryId}`);
      setTimeEntries(prev => prev.filter(entry => entry.id !== entryId));
    } catch (error) {
      console.error("Erro ao excluir lançamento:", error);
      throw error;
    }
  };

  // Props comuns para todas as páginas
  const commonProps = {
    selectedDeveloper,
    projects,
    developers,
    timeEntries,
    loading,
    onCreateProject: handleCreateProject,
    onDeleteProject: handleDeleteProject,
    onCreateDeveloper: handleCreateDeveloper,
    onCreateTimeEntry: handleCreateTimeEntry,
    onDeleteTimeEntry: handleDeleteTimeEntry
  }

  const renderCurrentPage = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-64">
        <p>Carregando dados...</p>
      </div>;
    }

    switch (currentPage) {
      case 'projects':
        return (
          <Projects 
            {...commonProps}
          />
        )
      case 'timeEntries':
        return (
          <TimeEntries 
            {...commonProps}
          />
        )
      default:
        return <Dashboard {...commonProps} />
    }
  }

  return (
    <ModernLayout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      developers={developers}
      selectedDeveloper={selectedDeveloper}
      setSelectedDeveloper={setSelectedDeveloper}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={setSelectedPeriod}
    >
      {renderCurrentPage()}
    </ModernLayout>
  )
}

export default App