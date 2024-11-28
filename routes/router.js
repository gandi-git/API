const express = require ("express")
const tokenAuth = require ("../controller/auth/tokenAuth")
const Auth = require ("../controller/auth/authController")
const Project = require ("../controller/projects/projectsController")
const Company = require ("../controller/users/companyController")
const Student = require ("../controller/users/studentsController")
const ProjectStudent = require ("../controller/projects/projectsStudentController")
const Action = require ("../controller/action/actionController")

const multer = require ("multer")
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Hanya file gambar (jpeg, jpg, png) yang diizinkan!'));
    }
  },
});

//auth
router.post("/api/login", Auth.Login)
router.post("/api/register", Auth.Register)

//student
router.get("/api/students", tokenAuth.tokenAuth, Student.getStudent)
router.get("/api/students/:id", tokenAuth.tokenAuth, Student.getStudent)
router.post("/api/students", upload.single('file'), tokenAuth.tokenAuth, Student.createStudent)
router.put("/api/students/:id", upload.single('file'), tokenAuth.tokenAuth, Student.updateStudent)
router.delete("/api/students/:id", tokenAuth.tokenAuth, Student.deleteStudent)

//company
router.get("/api/companies", tokenAuth.tokenAuth, Company.getCompany)
router.get("/api/companies/:id", tokenAuth.tokenAuth, Company.getCompany)
router.post("/api/companies", upload.single('file'), tokenAuth.tokenAuth, Company.createCompany)
router.put("/api/companies/:id", upload.single('file'), tokenAuth.tokenAuth, Company.updateCompany)
router.delete("/api/companies/:id", tokenAuth.tokenAuth, Company.deleteCompany)

//project
router.get("/api/projects", tokenAuth.tokenAuth, Project.getProject)
router.get("/api/projects/:id", tokenAuth.tokenAuth, Project.getProject)
router.post("/api/projects", upload.single('file'), tokenAuth.tokenAuth, Project.createProject)
router.put("/api/projects/:id", upload.single('file'), tokenAuth.tokenAuth, Project.updateProject)
router.delete("/api/projects/:id", tokenAuth.tokenAuth, Project.deleteProject)

//projectStudent
router.get("/api/projectstudent", tokenAuth.tokenAuth, ProjectStudent.getProjectStudent)
router.get("/api/projectstudent/:id", tokenAuth.tokenAuth, ProjectStudent.getProjectStudent)
router.post("/api/projectstudent", tokenAuth.tokenAuth, ProjectStudent.createProjectStudent)
router.put("/api/projectstudent/:id", tokenAuth.tokenAuth, ProjectStudent.updateProjectStudent)
router.delete("/api/projectstudent/:id", tokenAuth.tokenAuth, ProjectStudent.deleteProjectStudent)

//action
router.patch("/api/projectstudent-link/:id", tokenAuth.tokenAuth, Action.changeLinkProjectStudent)
router.patch("/api/projectstudent-result/:id", tokenAuth.tokenAuth, Action.changeSatatusAndResultProjectStudent)
router.patch("/api/project-status/:id", tokenAuth.tokenAuth, Action.changeStatusProject)

module.exports = router