import { NextApiRequest, NextApiResponse } from "next";
import getItem from "../../data";
import { enable_cors } from "./file_info";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await enable_cors(req, res);
  const path = req.query.dir + "";
  const state = await getItem(path);
  return res.status(200).json(state);
}
