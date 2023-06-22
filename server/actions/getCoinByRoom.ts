import IORedis from "ioredis";

const client = new IORedis({
    host: "localhost",
    port: 6379,
});
export const getCoinsByRoom = async (roomName: string) => {
    try {
        const coinsJSON = await client.hgetall(`room:${roomName}:coins`);
        const coins = Object.values(coinsJSON);
        return coins;
    } catch (error) {
        console.error("Error with coins:", error);
        throw error;
    }
}
