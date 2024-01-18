import { validationResult } from "express-validator";
import path from "path";
import dotEnv from "dotenv";

// build error object
const buildError = (message = "An Error Occured!", statusCode = 500, data = null, status = false) => {
  let err = new Error(message);
  err.statusCode = statusCode;
  err.status = status;
  err.data = data;
  return err;
};

// build response object
const buildResponse = (res, message, data = null, statusCode = 200, status = true) => {
  return res.status(statusCode).json({ message, data, statusCode, status });
};

// check pagination params
const checkPagination = (pageParams) => {
  let page = +pageParams?.page;
  let pageSize = +pageParams?.pageSize;
  if (!page || !pageSize) return null;
  return { page, pageSize, skip: (page - 1) * pageSize };
};

// build paginated response data
const makePaginatedData = (pagedItems, count, pageInfo = null) => {
  let pageData = { page: pageInfo?.page, pageSize: pageInfo?.pageSize, docs: pagedItems, count: count };
  if (pageInfo?.pageSize) pageData.pages = Math.ceil(count / pageInfo?.pageSize);
  return pageData;
};

// validate request payload is valid
const handlePayloadError = (req) => {
  const err = validationResult(req);
  if (!err.isEmpty()) throw buildError(err.array()[0].msg, 400, err.array());
};

const regxEscape = (val) => `^${val.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&")}$`;

// build path
const buildPath = (...pathSeg) => path.join(process.cwd(), ...pathSeg);

const loadEnvFile = () => dotEnv.config({ path: buildPath(".env") });

export default {
  buildError,
  buildResponse,
  checkPagination,
  regxEscape,
  makePaginatedData,
  handlePayloadError,
  loadEnvFile,
};
