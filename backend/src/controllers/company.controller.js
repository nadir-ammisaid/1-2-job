import { Company } from "../models/Company.js";

export async function getAllCompanies(req, res) {
    try {
        const companies = await Company.getAll();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function getCompanyById(req, res) {
    try {
        const company = await Company.getById(req.params.id);
        if(!company) return res.status(404).json({ message: "Company not found" });
        res.json(company);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function createCompany(req, res){
    try {
        const result = await Company.create(req.body);
        res
        .status(201)
        .json({ message: "Company created successfully", id_company: result.id_company });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateCompany(req, res) {
    try{
        const result = await Company.update(req.params.id, req.body);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Company not found" });
        res.json({ message: "Company updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deleteCompany(req, res) {
    try {
        const result = await Company.delete(req.params.id);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Company not found" });
        res.json({ message: "Company deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}