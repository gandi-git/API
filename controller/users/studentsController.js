exports.getStudent = async (req, res)=>{
    const { id } = req.params;

try {
    if (id) {
        const student = await prisma.student.findUnique({
            where: { id },
            include: {
                projectStudents: true,
            },
        });

        if (!student) {
            return res.status(404).json({ error: "Student tidak ditemukan" });
        }

        return res.status(200).json({
            message: "Data student berhasil diambil",
            student,
        });
    } else {
        const students = await prisma.student.findMany({
            include: {
                projectStudents: true,
            },
        });

        return res.status(200).json({
            message: "Semua data student berhasil diambil",
            students,
        });
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

exports.createStudent = async (req, res)=>{
    const studentData = req.body
    const image = req.files?.image
    const hashedPassword = await bcrypt.hash(studentData.password, 10)
    try{
        const student = await prisma.student.create({
            data :{
                username: studentData.username,
                password: hashedPassword,
                email: studentData.email,
                schoolAt : studentData.schoolAt,
                fullName : studentData.fullName,
                image : image || null,
                role : "student"
            }
        })
        response(201, student, "Sukses, data user ditambahkan", res)

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


exports.updateStudent = async (req, res)=>{
    const id = req.params.id
    const studentData = req.body
    const image = req.files?.image
    const hashedPassword = await bcrypt.hash(studentData.password, 10)

    if (
        !(
            studentData.username &&
            studentData.password &&
            studentData.email &&
            studentData.fullName &&
            studentData.schoolAt &&
            studentData.role
        )
    ) {
        return res.status(400).send("Some field is missing")
    }
    try {
        const updateData = {
            username: studentData.username,
            password: hashedPassword,
            email: studentData.email,
            fullName: studentData.fullName,
            schoolAt: studentData.schoolAt,
            role: studentData.role,
        };
        if (image) {
            updateData.image = image
        }

        const student = await prisma.student.update({
            where: { id: id },
            data: updateData,
        });

        response(200, student, "Data user telah diupdate", res)
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

exports.deleteStudent = async (req, res)=>{
    const id = req.params.id
    try{
        await prisma.student.delete({
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