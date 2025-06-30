import Project from "../models/Project.js";
import Developer from "../models/Developer.js";
import TimeEntry from "../models/TimeEntry.js";

export const getDashboardStats = async (req, res) => {
  const developerId = req.query.developerId ? parseInt(req.query.developerId) : null;
  
  try {
    // Obter todos os projetos e lançamentos
    let projects = await Project.getAll();
    let timeEntries = await TimeEntry.getAll();
    
    // Filtrar se houver developerId
    if (developerId) {
      timeEntries = timeEntries.filter(entry => entry.developer_id === developerId);
      const projectIds = [...new Set(timeEntries.map(entry => entry.project_id))];
      projects = projects.filter(project => projectIds.includes(project.id));
    }

    // Calcular estatísticas
    const totalProjects = projects.length;
    const totalHours = projects.reduce((sum, project) => sum + project.total_hours, 0);
    const usedHours = timeEntries.reduce((sum, entry) => sum + parseFloat(entry.hours), 0);
    const remainingHours = totalHours - usedHours;
    
    // Calcular valor total
    let totalValue = 0;
    for (const entry of timeEntries) {
      const developer = await Developer.getById(entry.developer_id);
      if (developer) {
        totalValue += parseFloat(entry.hours) * parseFloat(developer.hourly_rate);
      }
    }

    res.json({
      totalProjects,
      totalHours,
      usedHours,
      remainingHours,
      totalValue
    });
  } catch (error) {
    console.error("Erro no dashboard:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getDashboardChartData = async (req, res) => {
  const developerId = req.query.developerId ? parseInt(req.query.developerId) : null;
  
  try {
    // Obter dados
    let projects = await Project.getAll();
    let timeEntries = await TimeEntry.getAll();
    const developers = await Developer.getAll();
    
    // Filtrar se houver developerId
    if (developerId) {
      timeEntries = timeEntries.filter(entry => entry.developer_id === developerId);
      const projectIds = [...new Set(timeEntries.map(entry => entry.project_id))];
      projects = projects.filter(project => projectIds.includes(project.id));
    }

    // Preparar dados para gráficos
    const projectsData = projects.map(project => {
      const projectEntries = timeEntries.filter(entry => entry.project_id === project.id);
      const usedHours = projectEntries.reduce((sum, entry) => sum + parseFloat(entry.hours), 0);
      const progress = (usedHours / project.total_hours) * 100;

      return {
        name: project.name.length > 15 ? project.name.substring(0, 15) + '...' : project.name,
        totalHours: project.total_hours,
        usedHours: usedHours,
        remainingHours: project.total_hours - usedHours,
        progress: Math.round(progress)
      };
    });

    const developersData = developers.map(developer => {
      const devEntries = timeEntries.filter(entry => entry.developer_id === developer.id);
      const hours = devEntries.reduce((sum, entry) => sum + parseFloat(entry.hours), 0);
      
      return {
        name: developer.name,
        hours: hours,
        value: hours
      };
    }).filter(dev => dev.hours > 0);

    const dailyData = {};
    timeEntries.forEach(entry => {
      const date = new Date(entry.date).toLocaleDateString('pt-BR');
      if (!dailyData[date]) {
        dailyData[date] = 0;
      }
      dailyData[date] += parseFloat(entry.hours);
    });

    const lineData = Object.entries(dailyData)
      .sort(([a], [b]) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-')))
      .map(([date, hours]) => ({
        date: date,
        hours: hours
      }));

    res.json({ projectsData, developersData, lineData });
  } catch (error) {
    console.error("Erro nos gráficos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};