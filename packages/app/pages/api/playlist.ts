import { NextApiRequest, NextApiResponse } from "next";
import { getDirectoryInfo } from "../../data";
import { enable_cors } from "./file_info";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await enable_cors(req, res);
  const state = await getDirectoryInfo(req.query.dir + "");
  return res.status(200).json(state);
}
