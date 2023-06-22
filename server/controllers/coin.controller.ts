import { Response, Request } from "express";
import IORedis from "ioredis";

export async function getCoinsByRoom(req: Request, res: Response) {
    const room: string = req.params.room;
    const client: IORedis = new IORedis({
      host: "localhost",
      port: 6379
    });
    try {
      const coins = await client.hgetall(`room:${room}:coins`);
      const coinJSON = [];
      for (const coin of Object.values(coins)) {
        const coinData = JSON.parse(coin);
        const coinId = coinData.id;
        const coinKey = `coin:${coinId}`;
        const coinExists = await client.exists(coinKey);
        if (coinExists) {
          const ttl = await client.pttl(coinKey);
          coinData.ttl = ttl;
          coinJSON.push(coinData);
        }
      }
      const coinCount: number = coinJSON.length;
      res.status(200).json({ CoinCount: coinCount, Coins: coinJSON });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).send({ message: "Error 500. Internal Server Error" });
    } finally {
      client.quit();
    }
  }

  
  
  
  
  
  