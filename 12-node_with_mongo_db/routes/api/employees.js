const express = require("express");
const router = express.Router();
const path = require("path");
const employeesController = require("../../controllers/employeesController");

const verifyJWT = require("../../middleware/verifyJWT");
const ROLES_LIST = require("../../config/rolesList");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(verifyJWT, employeesController.getAllEmployees)
    .post(verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    .put(verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id").get(verifyJWT, employeesController.getEmployee);

module.exports = router;
