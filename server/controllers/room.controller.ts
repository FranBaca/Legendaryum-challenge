import {Request, Response} from "express"
import IORedis from "ioredis"

export async function getAvailableRooms(req:Request, res:Response){
    const client = new IORedis({
        host:"localhost",
        port:6379
    });
    try{
        const rooms = await client.keys("room:*:coins");
        if(rooms.length === 0){
            return res.status(404).json({message: "No rooms found"})
        }
        const availableRoomsCount: number = rooms.length

        const availableRooms : string[] = rooms.map((roomKey) => roomKey.split(":")[1])
        return res.status(200).json({AvailableRoomsCount: availableRoomsCount, AvailableRooms: availableRooms})
    }catch(error){
        console.log("Something went wrong...", error)
        return res.status(500).json({message: "Internal Error"})
    } finally{
        client.quit()
    }
}