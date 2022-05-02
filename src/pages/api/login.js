import nookies from "nookies";
import { post } from "../../../utils/auth";

const handler = async (req, res) => {
  const body = req.body;

  const user = await post("/api/auth/local", body);

  const success = user.jwt != null;

  if (success) {
    nookies.set({ res }, "jwt", user.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(200).send(user);
    return;
  }

  res.status(200).send(user.error);
};

export default handler;