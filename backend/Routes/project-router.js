var express = require('express');
var router = express.Router();
var projectController = require('../Controllers/projects-controller');
var authenticateJWT = require('../Middlewares/authenticateMiddleware');
var authorizeRole = require('../Middlewares/authorizationMiddleware');


router.post("/createproject", authenticateJWT, projectController.CreateProject);
router.get("/projects", authenticateJWT, projectController.GetAllProjects);
router.put("/updateproject/:id", authenticateJWT, projectController.updateSpecificProject);
router.put("/activateproject/:id", authenticateJWT, projectController.activateSingleProject);
router.put("/deactivateproject/:id", authenticateJWT, projectController.deactivateSingleProject);
router.get("/activeprojects", authenticateJWT, projectController.getActiveProjects);
router.get("/inactiveprojects", authenticateJWT, projectController.getInactiveProjects);
router.delete("/deleteproject/:id", authenticateJWT, projectController.deleteProject);


module.exports = router;


