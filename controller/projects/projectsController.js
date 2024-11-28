exports.getProject = async (req, res)=>{
    const { id } = req.params;
    try {
        if (id) {
            const project = await prisma.project.findUnique({
                where: { id },
                include: {
                    company: true,
                    projectStudents: true,
                },
            });

            if (!project) {
                return res.status(404).json({ error: "project tidak ditemukan" });
            }

            return response(200, project, "Semua data project berhasil diambil", res)
        } else {
            const projects = await prisma.project.findMany({
                include: {
                    company: true,
                    projectStudents: true,
                },
            });

            return response(200, projects, "Semua data project berhasil diambil", res)
        }
    } catch (err) {
        console.error("Error fetching project:", err.message);
        return res.status(500).json({
            error: "Terjadi kesalahan saat mengambil data Project",
        });
    }
}

exports.createProject = async (req, res)=>{
    const projectData = req.body
    const image = req.files?.image
    try{
        const project = await prisma.project.create({
            data : {
                name: projectData.name,
                description: projectData.description,
                startDate: new Date (projectData.startDate),
                endDate : new Date (projectData.endDate),
                status : projectData.status,
                image : image || null,
                companyId : projectData.companyId  
            }
        })
        response(201, project, "Sukses, data user ditambahkan", res)

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

exports.updateProject = async (req, res)=>{
    const { id } = req.params;
    const { name, description, startDate, endDate, status } = req.body;
    const image = req.files?.image;

    try {
        const existingProject = await prisma.project.findUnique({
            where: { id }
        });

        if (!existingProject) {
            return res.status(404).json({ error: "Project tidak ditemukan" });
        }

        const updateData = {
            name,
            description,
            startDate : new Date(startDate),
            endDate: new Date(endDate),
            status,
        };

        if (image) {
            updateData.image = image.filename;
        }
        const project = await prisma.project.update({
            where: { id },
            data: updateData
        });

        response(200, project, "Data user telah diupdate", res)
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

exports.deleteProject = async (req, res)=>{
    const id = req.params.id
    try{
        await prisma.project.delete({
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