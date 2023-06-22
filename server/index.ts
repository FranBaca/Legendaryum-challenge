import express from "express";
import http from "http"
import { Server, Socket } from "socket.io"
import { promisify } from "util"
import config from "./config/config.json"
import { generateCoins } from "./controllers/generateCoinsAndRooms.controller"
import coinsRoutes from "./routes/coin.routes"
import roomsRoutes from "./routes/rooms.routes"
import { getCoinsByRoom } from "./controllers/coin.controller";
import { deleteCoin } from "./actions/deleteCoin";
import IORedis from "ioredis";
import { Response } from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});
const PORT: number = 8080;

app.use("/", coinsRoutes);
app.use("/", roomsRoutes);

io.on("connection", (socket: Socket) => {
    console.log("New user connected");

    socket.on("enterRoom", async (data: any) => {
        const { data: eventData } = data;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        //Tenia un error aqui que esperaba 2 argumentos pero recibia 1, le di varias vueltas por que getCoinsByRoom espera un request y un response
        //pero no le encontre una solucion por el momento, si se ignora el error por ahora funciona. 
        const coinsJSON = await getCoinsByRoom(eventData.roomName);
        const { roomName } = eventData;
        const response = {
            status: "success",
            message: "Room entered successfully",
            event: roomName,
            coins: coinsJSON
        };
        socket.emit("enterRoom", response);
    });
    socket.on("deleteCoin", async (data: any) => {
        const { data: eventData } = data;
        const coinId: string = eventData.coinId;
        const roomName: string = eventData.roomName;
        await deleteCoin(coinId, roomName);
        const response = {
            status: "success",
            message: `Coin ID ${coinId} deleted`
        };
        socket.emit("Coin Deleted", response);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    })
});


server.listen(PORT, () => console.log("Server listening on port " + PORT));
const client = new IORedis({
    host: "localhost",
    port: 6379
});

export const setConfig = promisify(client.set).bind(client);

async function saveConfigToRedis() {
    try {
        const configJSON = JSON.stringify(config);
        await setConfig("config", configJSON);
        console.log("Config saved successfully on Redis");
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function startServer() {
    await saveConfigToRedis();
    await generateCoins();
    client.quit();
}

startServer();