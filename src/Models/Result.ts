
export class Result {
    id!: string;
    username: string;
    site: string;
    points: number;
    gameNumber: number;

    constructor(username: string, site: string, points: number, gameNumber: number) {
        this.username = username;
        this.site = site;
        this.points = points;
        this.gameNumber = gameNumber;
    }
}
