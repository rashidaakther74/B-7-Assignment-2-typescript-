import type { Request, Response } from "express";
import { issueService } from "./issues.service";
import sendResponse from "../../utils/sendResponse";

const createIssue = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const issue = await issueService.createIssueIntoDB({
      ...req.body,
      reporter_id: user.id,
    });

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: issue,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesIntoDB(req.query);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const data = await issueService.getSingleIssueIntoDB(
      req.params.id as string
    );

    if (!data) {
      return sendResponse(res, false, 404, "Issue not found");
    }

    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const result = await issueService.updateIssueIntoDB(
      req.body,
      req.params.id as string,
      user.id,
      user.role
    );

    if (!result || result.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this issue",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.deleteIssueFromDB(
      req.params.id as string
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};