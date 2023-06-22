import { Router } from "express";
import { getCoinsByRoom } from "../controllers/coin.controller";
const router = Router();

router.get("/coins/room/:room", getCoinsByRoom);

export default router;