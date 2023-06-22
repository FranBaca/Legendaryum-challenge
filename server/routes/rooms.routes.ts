import { Router } from "express";
import { getAvailableRooms } from "../controllers/room.controller";
const router = Router()

router.get("/rooms", getAvailableRooms)

export default router;