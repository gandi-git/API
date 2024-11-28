exports.getCompany = async (req, res)=>{
    const { id } = req.params;

    try {
        if (id) {
            const company = await prisma.company.findUnique({
                where: { id },
                include: {
                    projects: true,
                },
            })

            if (!company) {
                return res.status(404).json({ error: "Company tidak ditemukan" });
            }

            return response(200, companies, "Semua data Company berhasil diambil", res)

        } else {
            const companies = await prisma.company.findMany({
                include: {
                    projects: true,
                },
            })

            return response(200, companies, "Semua data Company berhasil diambil", res)

        }
    }catch (err) {
        if (err.response) {
            console.error("Response error:", err.response.data)
            res.status(err.response).json({ error: "Terjadi kesalahan saat registrasi.", details: err.response.data });
        } else if (err.request) {
            console.error("Request error:", err.request)
            res.status(500).json({ error: "Tidak ada respon dari server." })
        } else {
            console.error("Error message:", err.message)
         res.status(500).json({ error: "Terjadi kesalahan dalam menghubungi server." })
        }
    }  
}

exports.createCompany = async (req, res)=>{
    const companyData = req.body
    const image = req.files?.image
    const hashedPassword = await bcrypt.hash(companyData.password, 10)
    try{
        const company = await prisma.company.create({
            data : {
                username: companyData.username,
                password: hashedPassword,
                email: companyData.email,
                address : companyData.address,
                fullName : companyData.fullName,
                image : image || null,
                role : "company"
            }
        })
        response(201, company, "Sukses, data user ditambahkan", res)

    }catch (err) {
        if (err.response) {
            console.error("Response error:", err.response.data);
            res.status(err.response).json({ error: "Terjadi kesalahan saat registrasi.", details: err.response.data });
        } else if (err.request) {
            console.error("Request error:", err.request);
            res.status(500).json({ error: "Tidak ada respon dari server." });
            
        } else {
            console.error("Error message:", err.message);
         res.status(500).json({ error: "Terjadi kesalahan dalam menghubungi server." });
        }
    }
}

exports.updateCompany = async (req, res)=>{
    const id = req.params.id
    const companyData = req.body
    const image = req.files?.image
    const hashedPassword = await bcrypt.hash(companyData.password, 10)

    if (
        !(
            companyData.username &&
            companyData.password &&
            companyData.email &&
            companyData.fullName &&
            companyData.address &&
            companyData.role
        )
    ) {
        return res.status(400).send("Some field is missing")
    }
    try {
        const updateData = {
            username: companyData.username,
            password: hashedPassword,
            email: companyData.email,
            fullName: companyData.fullName,
            address: companyData.address,
            role: companyData.role,
        };
        if (image) {
            updateData.image = image
        }

        const company = await prisma.company.update({
            where: { id: id },
            data: updateData,
        });

        response(200, company, "Data user telah diupdate", res)
    } catch (err) {
        if (err.response) {
            console.error("Response error:", err.response.data);
            res.status(err.response).json({ error: "Terjadi kesalahan saat registrasi.", details: err.response.data });
        } else if (err.request) {
            console.error("Request error:", err.request);
            res.status(500).json({ error: "Tidak ada respon dari server." });
            
        } else {
            console.error("Error message:", err.message);
            res.status(500).json({ error: "Terjadi kesalahan dalam menghubungi server." });
        }
    }
}

exports.deleteCompany = async (req, res)=>{
    const id = req.params.id
    try{
        await prisma.company.delete({
            where : {
                id: id
            }
        })
        res.send("Data user telah dihapus.")
    }catch (err) {
        if (err.response) {
            console.error("Response error:", err.response.data);
            res.status(err.response).json({ error: "Terjadi kesalahan saat registrasi.", details: err.response.data });
        } else if (err.request) {
            console.error("Request error:", err.request);
            res.status(500).json({ error: "Tidak ada respon dari server." });
            
        } else {
            console.error("Error message:", err.message);
         res.status(500).json({ error: "Terjadi kesalahan dalam menghubungi server." });
        }
    }
}