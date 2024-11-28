exports.getProjectStudent = async (req, res)=>{
    const { id } = req.params;

    try {
        if (id) {
            const projectStudent = await prisma.projectStudent.findUnique({
                where: { id },
                include: {
                    project: true, 
                    student: true,
                },
            });

            if (!projectStudent) {
                return res.status(404).json({
                    error: "Data ProjectStudent tidak ditemukan.",
                });
            }

            return res.status(200).json({
                message: "Data ProjectStudent berhasil diambil.",
                data: projectStudent,
            });
        } else {
            const projectStudents = await prisma.projectStudent.findMany({
                include: {
                    project: true,
                    student: true,
                },
            });

            return res.status(200).json({
                message: "Semua data ProjectStudent berhasil diambil.",
                data: projectStudents,
            });
        }
    } catch (err) {
        console.error("Error fetching ProjectStudent:", err.message);
        return res.status(500).json({
            error: "Terjadi kesalahan saat mengambil data ProjectStudent.",
        });
    }
}

exports.createProjectStudent = async (req, res)=>{
    const { projectId, studentId, linkProject } = req.body;

    if (!projectId || !studentId || !linkProject) {
        return res.status(400).json({ error: "Semua field harus diisi!" });
    }

    try {
        const projectStudent = await prisma.projectStudent.create({
            data: {
                projectId,
                studentId,
                assignAt: new Date(),
                status: "On Progress",
                linkProject,
                results: "Not Corrected",
            }
        })
        response(201, projectStudent, "Sukses, data user ditambahkan", res)

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

exports.updateProjectStudent = async (req, res)=>{
    const id = req.params.id
    const projectStudentData = req.body

    if (
        !(
            projectStudentData.projectId &&
            projectStudentData.studentId &&

            projectStudentData.linkProject

        )
    ) {
        return res.status(400).send("Some field is missing")
    }
    try {
        const updateData = {
            projectId: projectStudentData.projectId,
            studentId: projectStudentData.studentId,
            assignAt: new Date(),
            status: "On Progress",
            linkProject: projectStudentData.linkProject,
            results: "Not Corrected",
        };

        const projectStudents = await prisma.projectStudent.update({
            where: { id: id },
            data: updateData,
        });

        response(200, projectStudents, "Data user telah diupdate", res)
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

exports.deleteProjectStudent = async (req, res)=>{
    const id = req.params.id
    try{
        await prisma.projectstudent.delete({
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