import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function getAllUsers(req, res) {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// export async function createUser(req, res) {
//   try {
//     const { password, ...rest } = req.body;

//     if (!rest.first_name || !rest.last_name || !rest.email || !password) {
//       return res.status(400).json({
//         message:
//           "Missing required fields (first_name, last_name, email, password)",
//       });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     const result = await User.create({
//       ...rest,
//       password: hashed,
//     });

//     res
//       .status(201)
//       .json({ message: "User successfully created", id_user: result.id_user });
//   } catch (err) {
//     if (err?.code === "ER_DUP_ENTRY" || err?.errno === 1062) {
//       return res
//         .status(409)
//         .json({ message: "This email is already in use" });
//     }

//     console.error("Create user error:", err);

//     return res.status(500).json({ error: err.message });
//   }
// }

export async function createUser(req, res) {
  try {
    const { password, ...rest } = req.body;

    if (!rest.first_name || !rest.last_name || !rest.email || !password) {
      return res.status(400).json({
        message:
          "Missing required fields (first_name, last_name, email, password)",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await User.create({
      ...rest,
      password: hashed,
    });

    const token = jwt.sign(
      {
        id_user: result.id_user,
        email: rest.email,
        first_name: rest.first_name,
        last_name: rest.last_name,
        role: rest.role || "jobber",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User successfully created",
      id_user: result.id_user,
      token: token,
    });
  } catch (err) {
    if (err?.code === "ER_DUP_ENTRY" || err?.errno === 1062) {
      return res.status(409).json({ message: "This email is already in use" });
    }
    console.error("Create user error:", err);
    return res.status(500).json({ error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const userId = req.params.id || req.user.id_user;

    const result = await User.update(userId, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User data successfully updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const result = await User.delete(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// export async function loginUser(req, res) {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res
//         .status(400)
//         .json({ message: "Email and password are required" });

//     const user = await User.getByEmail(email);
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       {
//         id_user: user.id_user,
//         email: user.email,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         phone: user.phone,
//         city: user.city,
//         profession: user.profession,
//         description: user.description,
//         hard_skills: user.hard_skills,
//         soft_skills: user.soft_skills,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     res.cookie("auth_token", token, {
//       httpOnly: true,
//       // secure: process.env.NODE_ENV === "production",
//       secure: true,
//       sameSite: "none",
//       maxAge: 24 * 60 * 60 * 1000,
//       domain: ".railway.app",
//     });

//     return res.status(200).json({
//       message: "Login successful",
//       user: {
//         id_user: user.id_user,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         email: user.email,
//         phone: user.phone,
//         city: user.city,
//         profession: user.profession,
//         description: user.description,
//         hard_skills: user.hard_skills,
//         soft_skills: user.soft_skills,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ message: err.message || "Server error" });
//   }
// }

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await User.getByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id_user: user.id_user,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        city: user.city,
        profession: user.profession,
        description: user.description,
        hard_skills: user.hard_skills,
        soft_skills: user.soft_skills,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id_user: user.id_user,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        profession: user.profession,
        description: user.description,
        hard_skills: user.hard_skills,
        soft_skills: user.soft_skills,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
}

export async function logoutUser(req, res) {
  res.clearCookie("auth_token");
  res.json({ message: "Logout successful" });
}

export async function getCurrentUser(req, res) {
  try {
    const user = await User.getById(req.user.id_user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, ...userData } = user;
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
