const express = require("express");
const router = express.Router();
const path = require("path");
const employeesController = require("../../controllers/employeesController");

const verifyJWT = require("../../middleware/verifyJWT");

router
    .route("/")
    .get(verifyJWT, employeesController.getAllEmployees)
    .post(verifyJWT, employeesController.createNewEmployee)
    .put(verifyJWT, employeesController.updateEmployee)
    .delete(verifyJWT, employeesController.deleteEmployee);

router.route("/:id").get(verifyJWT, employeesController.getEmployee);

module.exports = router;
