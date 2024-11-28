exports.Login = async (req, res) => {
    const { username, email, password } = req.body;

    let user = await prisma.student.findFirst({
        where: {
            OR: [
                { username },
                { email },
            ]
        }
    });

    if (!user) {
        user = await prisma.company.findFirst({
            where: {
                OR: [
                    { username },
                    { email },
                ]
            }
        });

        if (!user) {
            return res.status(404).send("Login Gagal: Username atau Email tidak ditemukan!");
        }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(403).send("Login Gagal: Password Salah!");
    }

    const token = jwt.sign({
        userId: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role
    }, process.env.SECRET_KEY, { expiresIn: '24h' });

    response(200, { token }, `Login Sukses`, res);
}

exports.Register = async(req, res) =>{
    const { username, password, email, fullName, schoolAt } = req.body;
    const { role } = "student"
    
    if(!username || !password || !email){
        return res.status(404).json({error: "Lengkapi Datanya"})
    }
    
    try {

        const existingUser = await prisma.student.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: "Username atau email sudah terdaftar!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.student.create({
            data: {
                username,
                password: hashedPassword,
                email,
                fullName,
                schoolAt,
                role
            }
        });

        response(200, newUser, "Sukses, Data berhasil terdaftar!", res)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Terjadi kesalahan saat registrasi." })
    }
}
