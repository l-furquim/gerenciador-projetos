CREATE TABLE developers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    seniority ENUM('junior', 'pleno', 'senior') NOT NULL,
    hourly_rate DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de projetos
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    total_hours INT NOT NULL DEFAULT 0,
    description TEXT,
    cell INT,
    client INT,
    service INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de lançamentos de tempo
CREATE TABLE time_entries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    developer_id INT NOT NULL,
    description TEXT,
    hours DECIMAL(5, 2) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Chaves estrangeiras
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (developer_id) REFERENCES developers(id) ON DELETE CASCADE
);

-- Índices para melhor performance
CREATE INDEX idx_time_entries_project_id ON time_entries(project_id);
CREATE INDEX idx_time_entries_developer_id ON time_entries(developer_id);
CREATE INDEX idx_time_entries_date ON time_entries(date);
CREATE INDEX idx_developers_email ON developers(email);
CREATE INDEX idx_projects_name ON projects(name);

-- Inserção dos dados de exemplo
INSERT INTO developers (id, name, email, seniority, hourly_rate, created_at) VALUES
(1, 'João Silva', 'joao.silva@email.com', 'senior', 120.00, '2024-01-10 08:00:00'),
(2, 'Maria Santos', 'maria.santos@email.com', 'pleno', 85.00, '2024-01-12 09:15:00');

INSERT INTO projects (id, name, total_hours, description, cell, client, service, created_at) VALUES
(1, 'Sistema E-commerce', 120, 'Desenvolvimento de plataforma de e-commerce completa com React e Node.js', 101, 1001, 2001, '2024-01-15 10:30:00');

INSERT INTO time_entries (id, project_id, developer_id, description, hours, date, created_at) VALUES
(1, 1, 2, 'Implementação do sistema de autenticação e cadastro de usuários', 8.00, '2024-06-28', '2024-06-28 18:00:00');