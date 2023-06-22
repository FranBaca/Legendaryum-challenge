import { Area } from "../models/AreaConfig";

export function generateRandomPosition(area: Area) {
    const { xmin, xmax, ymin, ymax, zmin, zmax } = area;
    const x = Math.floor(Math.random() * (xmax - xmin + 1)) + xmin;
    const y = Math.floor(Math.random() * (ymax - ymin + 1)) + ymin;
    const z = Math.floor(Math.random() * (zmax - zmin + 1)) + zmin;
    return { x, y, z };
}