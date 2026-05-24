import express from "express";
import { auth, roleCheck } from "../auth/auth";
import { userController } from "./issues.controller";


const router = express.Router();

router.post("/", auth, userController.createIssue);
router.get("/", userController.getAllIssues);
router.get("/:id", userController.getSingleIssue);
router.put("/:id", auth, userController.updateIssue);
router.delete("/:id", auth, roleCheck("maintainer"), userController.deleteIssue);

export const issueRoute = router;