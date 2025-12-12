DROP DATABASE IF EXISTS ntwJob;
-- CREATE DATABASE IF NOT EXISTS ntwJob;
-- CREATE DATABASE ntwJob CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE ntwJob;
USE railway;

DROP TABLE IF EXISTS application;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  city VARCHAR(20),
  profession VARCHAR(100),
  description TEXT,
  photo_path VARCHAR(255),
  hard_skills VARCHAR(255),
  soft_skills VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'jobber') DEFAULT 'jobber'
);

CREATE TABLE company (
  id_company INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  city VARCHAR(20),
  sector VARCHAR(50),
  logo_path VARCHAR(255),
  description TEXT
);

CREATE TABLE job (
  id_job INT AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(100) NOT NULL,
  contract_type ENUM('Permanent', 'Temporary', 'Internship', 'Freelance', 'Apprenticeship') DEFAULT 'Permanent',
  short_description VARCHAR(255),
  full_description TEXT,
  salary VARCHAR(100),
  workplace_type ENUM('on-site', 'remote', 'hybrid') DEFAULT 'on-site',
  working_time ENUM('full-time', 'part-time', 'freelance') DEFAULT 'full-time',
  date_posted DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_company INT,
  FOREIGN KEY (id_company) REFERENCES company(id_company) ON DELETE CASCADE
);

CREATE TABLE application (
  id_application INT AUTO_INCREMENT PRIMARY KEY,
  date_applied DATETIME DEFAULT CURRENT_TIMESTAMP,
  message TEXT,
  resume_path VARCHAR(255),
  id_user INT,
  id_job INT,
  FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE,
  FOREIGN KEY (id_job) REFERENCES job(id_job) ON DELETE CASCADE
);



INSERT INTO user (first_name, last_name, email, phone, city, profession, description, hard_skills, soft_skills, password, role)
VALUES
('Admin', 'User', 'admin@12job.com', '0600000000', 'Lyon', 'Administrator', 'Manages the 12job platform and oversees all operations.', 'SQL, PHP, Management, System Administration', 'Leadership, Communication, Problem Solving', 'hashed_admin_pass', 'admin'),
('Nadir', 'AMMI-SAID', 'nadir.ammisaid@mail.com', '0611223344', 'Lyon', 'Full Stack Developer', 'Passionate full stack developer with expertise in modern web technologies and cloud solutions.', 'JavaScript, React, Node.js, Python, Docker', 'Team Collaboration, Adaptability, Critical Thinking', 'hashed_password1', 'jobber'),
('Warith', 'DIMIA', 'warith.dimia@mail.com', '0677889900', 'Brignais', 'Full Stack Developer', 'Experienced developer specializing in scalable web applications and microservices architecture.', 'TypeScript, Vue.js, Express, MongoDB, Kubernetes', 'Problem Solving, Communication, Innovation', 'hashed_password2', 'jobber'),
('Toni', 'SAGE', 'toni.sage@mail.com', '0655443322', 'Miribel', 'Full Stack Developer', 'Creative full stack developer focused on building elegant and performant user experiences.', 'HTML, CSS, React, Node.js, PostgreSQL, AWS', 'Creativity, Attention to Detail, Time Management', 'hashed_password3', 'jobber'),
('Sophie', 'Martin', 'sophie.martin@mail.com', '0612345678', 'Toulouse', 'Data Analyst', 'Analytical professional transforming complex data into actionable business insights.', 'Python, SQL, Tableau, Excel, Statistical Analysis', 'Analytical Thinking, Precision, Curiosity', 'hashed_password4', 'jobber'),
('Lucas', 'Dubois', 'lucas.dubois@mail.com', '0623456789', 'Bordeaux', 'UX/UI Designer', 'User-centered designer creating intuitive and beautiful digital experiences.', 'Figma, Adobe XD, Sketch, Prototyping, User Research', 'Empathy, Creativity, Collaboration', 'hashed_password5', 'jobber'),
('Emma', 'Leroy', 'emma.leroy@mail.com', '0634567890', 'Nantes', 'Project Manager', 'Agile project manager driving successful digital transformation initiatives.', 'Scrum, Jira, MS Project, Budget Management', 'Organization, Leadership, Communication', 'hashed_password6', 'jobber'),
('Mohamed', 'Benali', 'mohamed.benali@mail.com', '0645678901', 'Marseille', 'DevOps Engineer', 'Infrastructure specialist automating deployments and optimizing cloud environments.', 'Jenkins, Docker, Kubernetes, Terraform, CI/CD', 'Automation, Problem Solving, Efficiency', 'hashed_password7', 'jobber');



INSERT INTO company (name, email, phone, city, sector, logo_path, description)
VALUES
('Worldline', 'contact@worldline.com', '0123456789', 'Lyon', 'Technology', 'logos/worldline.png', 'European leader in payment and digital transactional services.'),
('Capgemini', 'info@capgemini.com', '0147852369', 'Paris', 'Consulting', 'logos/capgemini.png', 'Consulting firm specializing in digital and technological transformation.'),
('HelloWork', 'contact@hellowork.io', '0178991122', 'Lille', 'HR', 'logos/hellowork.png', 'Recruitment platform and innovative HR solutions provider.'),
('Thales', 'recrutement@thales.com', '0156473800', 'Toulouse', 'Aerospace', 'logos/thales.png', 'Technology group in aerospace and cybersecurity.'),
('Michelin', 'jobs@michelin.com', '0473322000', 'Clermont-Ferrand', 'Industry', 'logos/michelin.png', 'Global manufacturer of tires and mobility solutions.'),
('Dassault Systèmes', 'careers@3ds.com', '0161626100', 'Vélizy', 'Software', 'logos/dassault.png', '3D software publisher and industrial design solutions provider.'),
('Atos', 'contact@atos.net', '0173260000', 'Bezons', 'IT Services', 'logos/atos.png', 'Specialist in digital services and digital transformation.');



INSERT INTO job (job_title, contract_type, short_description, full_description, salary, workplace_type, working_time, date_posted, id_company)
VALUES
('Full Stack Developer', 'Permanent', 'Build scalable payment solutions for e-commerce platforms.', 'Join Worldline to develop cutting-edge payment technologies using Node.js, React, and microservices architecture. Work on secure transaction systems serving millions of users across Europe.', '40-50K€', 'hybrid', 'full-time', '2025-10-15 15:30:00', 1),
('Communication Officer', 'Temporary', 'Drive digital transformation communication campaigns.', 'Lead internal and external communications for Capgemini major consulting projects. Create engaging content, manage stakeholder relationships, and coordinate marketing initiatives across multiple channels.', '2500€/month', 'on-site', 'full-time', '2025-10-14 15:45:00', 2),
('Junior Data Scientist', 'Internship', 'Apply machine learning to recruitment analytics.', 'Support HelloWork data team in building predictive models for candidate matching and job recommendations. Analyze hiring trends and develop insights to improve our recruitment platform performance.', '1200€/month', 'hybrid', 'part-time', '2025-10-14 11:25:00', 3),
('UX/UI Designer', 'Freelance', 'Redesign payment interface for better user experience.', 'Transform Worldline payment solutions with modern UX/UI design. Create intuitive interfaces, conduct user research, and deliver high-fidelity prototypes using Figma and design systems for fintech applications.', '450€/day', 'remote', 'full-time', '2025-10-13 14:15:00', 1),
('Cybersecurity Engineer', 'Permanent', 'Protect critical aerospace infrastructure and systems.', 'Join Thales security team to design and implement advanced cybersecurity solutions. Monitor threats, conduct penetration testing, and ensure compliance with aerospace industry security standards.', '45-55K€', 'on-site', 'full-time', '2025-10-13 10:05:00', 4),
('Industrial Process Engineer', 'Permanent', 'Drive manufacturing excellence and automation initiatives.', 'Optimize Michelin production processes through lean manufacturing and Industry 4.0 technologies. Implement automation solutions, reduce waste, and improve operational efficiency across tire manufacturing lines.', '38-48K€', 'on-site', 'part-time', '2025-10-10 11:30:00', 5),
('Software Developer', 'Apprenticeship', 'Learn 3D modeling software development professionally.', 'Join Dassault Systèmes apprenticeship program to develop 3D design applications. Work with experienced engineers on CATIA and SOLIDWORKS while completing your engineering degree in software development.', '1600€/month', 'hybrid', 'full-time', '2025-10-09 13:45:00', 6),
('Cloud Solutions Architect', 'Permanent', 'Design enterprise cloud infrastructure and migration strategies.', 'Lead Atos cloud transformation projects for major clients. Architect scalable AWS and Azure solutions, manage migrations from on-premise to cloud, and establish best practices for cloud-native applications.', '55-65K€', 'remote', 'full-time', '2025-10-09 12:00:00', 7),
('DevOps Engineer', 'Permanent', 'Build automated CI/CD pipelines for enterprise clients.', 'Implement DevOps practices at Capgemini using Jenkins, GitLab, Docker, and Kubernetes. Automate deployment workflows, monitor infrastructure performance, and ensure high availability of production systems.', '42-52K€', 'hybrid', 'full-time', '2025-10-09 10:15:00', 2),
('Product Manager', 'Permanent', 'Shape the future of recruitment technology platform.', 'Define HelloWork product vision and roadmap for our HR tech solutions. Collaborate with engineering and design teams, analyze user feedback, and drive feature prioritization to enhance recruitment experiences.', '50-60K€', 'hybrid', 'part-time', '2025-10-08 16:30:00', 3),
('Embedded Systems Developer', 'Temporary', 'Develop real-time software for avionics systems.', 'Work on Thales aerospace projects developing embedded C/C++ code for flight control systems. Ensure real-time performance, safety-critical standards compliance, and integration with avionics hardware platforms.', '3800€/month', 'on-site', 'full-time', '2025-10-08 10:00:00', 4),
('Data Analyst', 'Internship', 'Transform business data into actionable insights.', 'Support Michelin analytics team in visualizing production data and market trends. Use Python, SQL, and PowerBI to create dashboards, perform statistical analysis, and present findings to management teams.', '1400€/month', 'on-site', 'full-time', '2025-10-07 15:45:00', 5);



INSERT INTO application (message, resume_path, id_user, id_job)
VALUES
('I would like to join your team to contribute my development skills.', 'resumes/alice_doe.pdf', 2, 1),
('Excited about your renewable mission, I want to be part of your projects.', 'resumes/julie_brown.pdf', 4, 2),
('This internship is perfect to apply my Data Science knowledge.', 'resumes/karim_johnson.pdf', 3, 3);
