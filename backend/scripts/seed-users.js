import bcrypt from "bcryptjs";
import db from "../src/config/connection.js";

const users = [
  {
    first_name: "Admin",
    last_name: "User",
    email: "admin@12job.com",
    phone: "0600000000",
    city: "Lyon",
    profession: "Administrator",
    description: "Manages the 12job platform and oversees all operations.",
    hard_skills: "SQL, PHP, Management, System Administration",
    soft_skills: "Leadership, Communication, Problem Solving",
    password: "Admin123!",
    role: "admin",
  },
  {
    first_name: "Nadir",
    last_name: "AMMI-SAID",
    email: "nadir.ammisaid@gmail.com",
    phone: "0611223344",
    city: "Lyon",
    profession: "Full Stack Developer",
    description:
      "Passionate full stack developer with expertise in modern web technologies and cloud solutions.",
    hard_skills: "JavaScript, React, Node.js, Python, Docker",
    soft_skills: "Team Collaboration, Adaptability, Critical Thinking",
    password: "Admin123!",
    role: "admin",
  },
  {
    first_name: "Warith",
    last_name: "DIMIA",
    email: "warith.dimia@gmail.com",
    phone: "0677889900",
    city: "Brignais",
    profession: "Full Stack Developer",
    description:
      "Experienced developer specializing in scalable web applications and microservices architecture.",
    hard_skills: "TypeScript, Vue.js, Express, MongoDB, Kubernetes",
    soft_skills: "Problem Solving, Communication, Innovation",
    password: "Jobber123!",
    role: "jobber",
  },
  {
    first_name: "Toni",
    last_name: "SAGE",
    email: "toni.sage@gmail.com",
    phone: "0655443322",
    city: "Miribel",
    profession: "Full Stack Developer",
    description:
      "Creative full stack developer focused on building elegant and performant user experiences.",
    hard_skills: "HTML, CSS, React, Node.js, PostgreSQL, AWS",
    soft_skills: "Creativity, Attention to Detail, Time Management",
    password: "Jobber123!",
    role: "jobber",
  },
  {
    first_name: "Sophie",
    last_name: "Martin",
    email: "sophie.martin@gmail.com",
    phone: "0612345678",
    city: "Toulouse",
    profession: "Data Analyst",
    description:
      "Analytical professional transforming complex data into actionable business insights.",
    hard_skills: "Python, SQL, Tableau, Excel, Statistical Analysis",
    soft_skills: "Analytical Thinking, Precision, Curiosity",
    password: "Jobber123!",
    role: "jobber",
  },
  {
    first_name: "Lucas",
    last_name: "Dubois",
    email: "lucas.dubois@gmail.com",
    phone: "0623456789",
    city: "Bordeaux",
    profession: "UX/UI Designer",
    description:
      "User-centered designer creating intuitive and beautiful digital experiences.",
    hard_skills: "Figma, Adobe XD, Sketch, Prototyping, User Research",
    soft_skills: "Empathy, Creativity, Collaboration",
    password: "Jobber123!",
    role: "jobber",
  },
  {
    first_name: "Emma",
    last_name: "Leroy",
    email: "emma.leroy@gmail.com",
    phone: "0634567890",
    city: "Nantes",
    profession: "Project Manager",
    description:
      "Agile project manager driving successful digital transformation initiatives.",
    hard_skills: "Scrum, Jira, MS Project, Budget Management",
    soft_skills: "Organization, Leadership, Communication",
    password: "Jobber123!",
    role: "jobber",
  },
  {
    first_name: "Mohamed",
    last_name: "Benali",
    email: "mohamed.benali@gmail.com",
    phone: "0645678901",
    city: "Marseille",
    profession: "DevOps Engineer",
    description:
      "Infrastructure specialist automating deployments and optimizing cloud environments.",
    hard_skills: "Jenkins, Docker, Kubernetes, Terraform, CI/CD",
    soft_skills: "Automation, Problem Solving, Efficiency",
    password: "Jobber123!",
    role: "jobber",
  },
];

async function seedUsers() {
  try {
    for (const user of users) {
      // Vérifier si l'utilisateur existe (par email)
      const existingUser = await new Promise((resolve, reject) => {
        db.query(
          "SELECT id_user FROM user WHERE email = ?",
          [user.email],
          (err, results) => {
            if (err) return reject(err);
            resolve(results[0] || null);
          }
        );
      });

      if (existingUser) {
        console.log(`⏭️  ${user.email} existe déjà — skip`);
        continue;
      }

      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Insertion utilisateur
      await new Promise((resolve, reject) => {
        const sql = `
          INSERT INTO user
          (
            first_name,
            last_name,
            email,
            phone,
            city,
            profession,
            description,
            hard_skills,
            soft_skills,
            password,
            role
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
          sql,
          [
            user.first_name,
            user.last_name,
            user.email,
            user.phone,
            user.city,
            user.profession,
            user.description,
            user.hard_skills,
            user.soft_skills,
            hashedPassword,
            user.role,
          ],
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
      });

      console.log(`✅ Utilisateur créé : ${user.email}`);
    }

    console.log("🎉 Seed users terminé");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur seed users:", err);
    process.exit(1);
  }
}

seedUsers();
