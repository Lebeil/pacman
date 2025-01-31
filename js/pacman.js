export class Pacman {
    constructor(startPosition) {
        this.x = startPosition.x;
        this.y = startPosition.y;
        this.radius = 11;
        this.speed = 3;
        this.direction = { x: 0, y: 0 };
        this.mouthOpen = 0;
        this.mouthSpeed = 0.15;
        this.lastDirectionChange = 0;
        this.directionChangeDelay = 150; // délai en millisecondes
    }

    handleInput(key) {
        const now = Date.now();
        if (now - this.lastDirectionChange < this.directionChangeDelay) {
            return; // Ignorer l'input si le délai n'est pas écoulé
        }
        
        switch(key) {
            case 'ArrowUp':
                this.direction = { x: 0, y: -1 };
                this.lastDirectionChange = now;
                break;
            case 'ArrowDown':
                this.direction = { x: 0, y: 1 };
                this.lastDirectionChange = now;
                break;
            case 'ArrowLeft':
                this.direction = { x: -1, y: 0 };
                this.lastDirectionChange = now;
                break;
            case 'ArrowRight':
                this.direction = { x: 1, y: 0 };
                this.lastDirectionChange = now;
                break;
        }
    }

    update(map) {
        const nextX = this.x + this.direction.x * this.speed;
        const nextY = this.y + this.direction.y * this.speed;

        const margin = this.radius * 0.8;
        if (!map.checkCollision(nextX - margin, nextY - margin) &&
            !map.checkCollision(nextX + margin, nextY - margin) &&
            !map.checkCollision(nextX - margin, nextY + margin) &&
            !map.checkCollision(nextX + margin, nextY + margin)) {
            this.x = nextX;
            this.y = nextY;
        }

        this.mouthOpen += this.mouthSpeed;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.atan2(this.direction.y, this.direction.x));

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 
            Math.abs(Math.sin(this.mouthOpen)) * 0.5, 
            2 * Math.PI - Math.abs(Math.sin(this.mouthOpen)) * 0.5);
        ctx.lineTo(0, 0);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }

    collidesWith(ghost) {
        const dx = this.x - ghost.x;
        const dy = this.y - ghost.y;
        return Math.sqrt(dx * dx + dy * dy) < this.radius + ghost.radius;
    }
} 