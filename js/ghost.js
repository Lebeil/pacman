export class Ghost {
    constructor(startPosition, color) {
        this.x = startPosition.x;
        this.y = startPosition.y;
        this.color = color;
        this.radius = 11;
        this.speed = 1.5;
        this.direction = { x: 0, y: 0 };
        this.changeDirectionCounter = 0;
        this.changeDirectionInterval = 60;
    }

    update(map, pacman) {
        this.changeDirectionCounter++;

        if (this.changeDirectionCounter >= this.changeDirectionInterval) {
            this.updateDirection(pacman);
            this.changeDirectionCounter = 0;
        }

        const nextX = this.x + this.direction.x * this.speed;
        const nextY = this.y + this.direction.y * this.speed;

        const margin = this.radius * 0.8;
        if (!map.checkCollision(nextX - margin, nextY - margin) &&
            !map.checkCollision(nextX + margin, nextY - margin) &&
            !map.checkCollision(nextX - margin, nextY + margin) &&
            !map.checkCollision(nextX + margin, nextY + margin)) {
            this.x = nextX;
            this.y = nextY;
        } else {
            this.updateDirection(pacman);
        }
    }

    updateDirection(pacman) {
        const dx = pacman.x - this.x;
        const dy = pacman.y - this.y;
        
        if (Math.random() < 0.3) {
            const randomDir = Math.floor(Math.random() * 4);
            switch(randomDir) {
                case 0: this.direction = { x: 1, y: 0 }; break;
                case 1: this.direction = { x: -1, y: 0 }; break;
                case 2: this.direction = { x: 0, y: 1 }; break;
                case 3: this.direction = { x: 0, y: -1 }; break;
            }
            return;
        }
        
        if (Math.abs(dx) > Math.abs(dy)) {
            this.direction.x = dx > 0 ? 1 : -1;
            this.direction.y = 0;
        } else {
            this.direction.x = 0;
            this.direction.y = dy > 0 ? 1 : -1;
        }
    }

    draw(ctx) {
        ctx.save();
        
        // Corps du fantôme
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        // Tête arrondie
        ctx.arc(this.x, this.y, this.radius, Math.PI, 0, false);
        
        // Corps et base ondulée
        ctx.lineTo(this.x + this.radius, this.y + this.radius);
        
        // Créer l'effet ondulé en bas
        const waves = 4;
        const waveHeight = 4;
        for (let i = 0; i <= waves; i++) {
            const curve = (i % 2 === 0) ? waveHeight : -waveHeight;
            const x = this.x + this.radius - (2 * this.radius * (i / waves));
            ctx.quadraticCurveTo(
                x + (this.radius / waves), this.y + this.radius + curve,
                x, this.y + this.radius
            );
        }
        
        ctx.lineTo(this.x - this.radius, this.y);
        ctx.fill();
        
        // Yeux
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x - 4, this.y - 2, 3, 0, Math.PI * 2);
        ctx.arc(this.x + 4, this.y - 2, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x - 4 + this.direction.x * 2, this.y - 2 + this.direction.y * 2, 1.5, 0, Math.PI * 2);
        ctx.arc(this.x + 4 + this.direction.x * 2, this.y - 2 + this.direction.y * 2, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
} 