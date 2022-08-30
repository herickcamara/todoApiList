import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import routers from "./routers/router";
import cors from "cors";

dotenv.config();

const server = express();
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({ extended: true }));

//routers
server.use(routers);

server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ errer: "Endpoint não encontrado" });
});

server.listen(process.env.PORT || 3000, () => console.log("run"));
