export class Ghost {
    constructor(startPosition, color) {
        this.x = startPosition.x;
        this.y = startPosition.y;
        this.color = color;
        this.radius = 15;
        this.speed = 2;
        this.direction = { x: 0, y: 0 };
    }

    update(map, pacman) {
        // Logique simple de poursuite
        const dx = pacman.x - this.x;
        const dy = pacman.y - this.y;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            this.direction.x = dx > 0 ? 1 : -1;
            this.direction.y = 0;
        } else {
            this.direction.x = 0;
            this.direction.y = dy > 0 ? 1 : -1;
        }

        const nextX = this.x + this.direction.x * this.speed;
        const nextY = this.y + this.direction.y * this.speed;

        if (!map.checkCollision(nextX, nextY)) {
            this.x = nextX;
            this.y = nextY;
        }
    }

    draw(ctx) {
        // Sauvegarder le contexte
        ctx.save();
        
        // Corps du fantôme
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        // Tête arrondie
        ctx.arc(this.x, this.y, this.radius, Math.PI, 0, false);
        
        // Corps et base ondulée
        ctx.lineTo(this.x + this.radius, this.y + this.radius);
        
        // Créer l'effet ondulé en bas
        const waves = 4; // Nombre de vagues
        const waveHeight = 5;
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
        ctx.arc(this.x - 5, this.y - 2, 4, 0, Math.PI * 2);
        ctx.arc(this.x + 5, this.y - 2, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x - 5 + this.direction.x * 2, this.y - 2 + this.direction.y * 2, 2, 0, Math.PI * 2);
        ctx.arc(this.x + 5 + this.direction.x * 2, this.y - 2 + this.direction.y * 2, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Restaurer le contexte
        ctx.restore();
    }
} 