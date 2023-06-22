export interface Config {
    rooms: Record<string, RoomConfig>;
    coinTTL: number;
}

export interface RoomConfig {
    coinCount: number;
    area: {
        xmin: number;
        xmax: number;
        ymin: number;
        ymax: number;
        zmin: number;
        zmax: number;
    };
}