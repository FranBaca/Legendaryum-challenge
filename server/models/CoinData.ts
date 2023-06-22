interface CoinConfig {
    id: string;
    room: string;
    position: Position;
}

interface Position {
    x: number;
    y: number;
    z: number;
}

export default CoinConfig;
