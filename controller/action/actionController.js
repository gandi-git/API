exports.changeSatatusAndResultProjectStudent = async(req, res) => {
    const id = req.params.id
    const data = req.body
    try{
        await prisma.projectStudent.update({
            where : {
                id: id
            },
            data : {
                status : "complete",
                results : data.results
            }
        })
        res.send("Data status telah dirubah.")
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

exports.changeLinkProjectStudent = async(req, res) => {
    const id = req.params.id
    const data = req.body
    try{
        await prisma.projectStudent.update({
            where : {
                id: id
            },
            data : {
                linkProject : data.linkProject,
            }
        })
        res.send("Data status telah dirubah.")
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

exports.changeStatusProject = async(req, res) => {
    const id = req.params.id
    const data = req.body
    try{
        await prisma.project.update({
            where : {
                id: id
            },
            data : {
                status : data.status,
            }
        })
        res.send("Data status telah dirubah.")
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