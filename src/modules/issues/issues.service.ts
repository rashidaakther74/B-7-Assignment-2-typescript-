import { pool } from "../../db";
import type { IIssue } from "./issues.interface";

const createIssueIntoDB = async (payload: IIssue) => {
  const { title, description, type, status, reporter_id } = payload;

  const result = await pool.query(
    `
    INSERT INTO issues(title, description, type, status, reporter_id)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [title, description, type, status || "open", reporter_id]
  );

  return result.rows[0];
};

const getAllIssuesFromDB = async (query: any) => {
  const { sort = "newest", type, status } = query;

  let sql = `SELECT * FROM issues`;
  const values: any[] = [];
  const conditions: string[] = [];
  let i = 1;

  if (type) {
    conditions.push(`type = $${i++}`);
    values.push(type);
  }

  if (status) {
    conditions.push(`status = $${i++}`);
    values.push(status);
  }

  if (conditions.length) {
    sql += ` WHERE ` + conditions.join(" AND ");
  }

  sql +=
    sort === "oldest"
      ? ` ORDER BY created_at ASC`
      : ` ORDER BY created_at DESC`;

  const result = await pool.query(sql, values);
  return result.rows;
};

const getSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `SELECT * FROM issues WHERE id=$1`,
    [id]
  );

  return result.rows[0];
};

const updateIssueIntoDB = async (payload: any, id: string) => {
  const { title, description, type, status } = payload;

  const result = await pool.query(
    `
    UPDATE issues 
    SET 
    title=COALESCE($1,title),
    description=COALESCE($2,description),
    type=COALESCE($3,type),
    status=COALESCE($4,status),
    updated_at=CURRENT_TIMESTAMP
    WHERE id=$5
    RETURNING *
    `,
    [title, description, type, status, id]
  );

  return result.rows[0];
};

const deleteIssueFromDB = async (id: string) => {
  await pool.query(
    `DELETE FROM issues WHERE id=$1`,
    [id]
  );

  return true;
};

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
  deleteIssueFromDB,
};