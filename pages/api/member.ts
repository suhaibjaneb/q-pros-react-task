import type { NextApiRequest, NextApiResponse } from "next";
import { type Member } from "@/lib/members";
import * as members from "@/lib/members";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Member[] | string>
) {
  switch (req.method) {
    case "GET":
      return res
        .status(200)
        .json(await members.getOne(req?.query?.id + "" || ""));
    default:
      return res.status(405).send("Method Not Allowed");
  }
}
