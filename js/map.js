export class Map {
    constructor() {
        this.tileSize = 30;
        this.pacmanStartPosition = { x: 45, y: 45 };
        this.totalDots = 0;
        this.layout = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,1],
            [1,2,1,1,1,2,1,2,1,1,1,1,2,1,2,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,0,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,0,1],
            [1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
            [1,1,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,0,1],
            [1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        this.countTotalDots();
    }

    countTotalDots() {
        this.totalDots = 0;
        for (let row of this.layout) {
            for (let cell of row) {
                if (cell === 2) this.totalDots++;
            }
        }
    }

    checkCollision(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);
        
        return this.layout[tileY] && this.layout[tileY][tileX] === 1;
    }

    draw(ctx) {
        for (let y = 0; y < this.layout.length; y++) {
            for (let x = 0; x < this.layout[y].length; x++) {
                if (this.layout[y][x] === 1) {
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(
                        x * this.tileSize, 
                        y * this.tileSize, 
                        this.tileSize, 
                        this.tileSize
                    );
                } else if (this.layout[y][x] === 2) {
                    ctx.beginPath();
                    ctx.fillStyle = 'white';
                    ctx.arc(
                        x * this.tileSize + this.tileSize/2,
                        y * this.tileSize + this.tileSize/2,
                        3, 0, Math.PI * 2
                    );
                    ctx.fill();
                }
            }
        }
    }

    collectDot(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);
        
        if (this.layout[tileY] && this.layout[tileY][tileX] === 2) {
            this.layout[tileY][tileX] = 0;
            return true;
        }
        return false;
    }
} 