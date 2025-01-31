import { Pacman } from './pacman.js';
import { Ghost } from './ghost.js';
import { Map } from './map.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.dotsCollected = 0;
        this.isGameRunning = true;
        this.map = new Map();
        this.pacman = new Pacman(this.map.pacmanStartPosition);
        this.ghosts = [
            new Ghost({ x: 290, y: 290 }, 'red'),
            new Ghost({ x: 290, y: 310 }, 'pink'),
            new Ghost({ x: 310, y: 290 }, 'cyan'),
            new Ghost({ x: 310, y: 310 }, 'orange')
        ];
        
        this.init();
    }

    async init() {
        await this.showWelcomeMessage();
        this.setupEventListeners();
        this.gameLoop();
    }

    async showWelcomeMessage() {
        return await Swal.fire({
            title: 'Pacman Moderne',
            text: 'Utilisez les flèches du clavier pour déplacer Pacman. Évitez les fantômes !',
            imageUrl: 'https://raw.githubusercontent.com/sweetalert2/sweetalert2/master/assets/swal2-logo.png',
            imageWidth: 100,
            imageHeight: 100,
            confirmButtonText: 'Commencer',
            background: '#222',
            color: '#fff',
            confirmButtonColor: '#3085d6'
        });
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            this.pacman.handleInput(e.key);
        });
    }

    gameLoop() {
        if (!this.isGameRunning) return;
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        this.pacman.update(this.map);
        this.ghosts.forEach(ghost => ghost.update(this.map, this.pacman));
        this.checkCollisions();
        
        // Vérifier la collecte de points
        if (this.map.collectDot(this.pacman.x, this.pacman.y)) {
            this.score += 10;
            this.dotsCollected++;
            
            // Vérifier la condition de victoire
            if (this.dotsCollected === this.map.totalDots) {
                this.victory();
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.draw(this.ctx);
        this.pacman.draw(this.ctx);
        this.ghosts.forEach(ghost => ghost.draw(this.ctx));
        this.drawScore();
    }

    drawScore() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 30);
    }

    checkCollisions() {
        // Vérification des collisions avec les fantômes
        this.ghosts.forEach(ghost => {
            if (this.pacman.collidesWith(ghost)) {
                this.gameOver();
            }
        });
    }

    gameOver() {
        this.isGameRunning = false;
        Swal.fire({
            title: 'Game Over!',
            text: `Score final : ${this.score}`,
            imageUrl: 'https://raw.githubusercontent.com/sweetalert2/sweetalert2/master/assets/swal2-logo.png',
            imageWidth: 100,
            imageHeight: 100,
            confirmButtonText: 'Rejouer',
            showCancelButton: true,
            cancelButtonText: 'Quitter',
            background: '#222',
            color: '#fff',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            } else {
                window.close();
            }
        });
    }

    victory() {
        this.isGameRunning = false;
        Swal.fire({
            title: 'Victoire !',
            text: `Félicitations ! Score final : ${this.score}`,
            icon: 'success',
            confirmButtonText: 'Rejouer',
            showCancelButton: true,
            cancelButtonText: 'Quitter',
            background: '#222',
            color: '#fff',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            } else {
                window.close();
            }
        });
    }
}

// Attendre que le DOM soit chargé avant de démarrer le jeu
document.addEventListener('DOMContentLoaded', () => {
    new Game();
}); 