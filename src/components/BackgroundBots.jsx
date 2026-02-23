import React, { useEffect, useRef, useState } from 'react';
import robotImgSrc from '../assets/robot.png';

const MAX_HEALTH = 10;
const HIT_RADIUS = 18; // px from cursor center to count as a hit

const BackgroundBots = ({ isHostile, onPlayerDeath }) => {
    const canvasRef = useRef(null);
    const hostileRef = useRef(isHostile);
    // DOM refs for the death panel — controlled directly from the animation loop
    const deathPanelRef = useRef(null);
    const dotsRef = useRef(null);
    const [showDeathPanel, setShowDeathPanel] = useState(false);

    useEffect(() => {
        hostileRef.current = isHostile;
    }, [isHostile]);

    useEffect(() => {
        console.log("BackgroundBots mounted");
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // --- State ---
        let bots = [];
        let bullets = [];
        // Use a ref-like object for mouse to ensure it's shared
        const mouse = { x: -1000, y: -1000 };

        // --- Player Health ---
        let playerHealth = MAX_HEALTH;
        let isDead = false;
        let deathTimer = 0; // how long death screen has been shown
        let hitFlash = 0;   // flash frames for damage feedback

        // Image processing: removing black background
        let robotSprite = null;
        const rawImg = new Image();
        rawImg.src = robotImgSrc;

        const processImage = () => {
            const buffer = document.createElement('canvas');
            buffer.width = rawImg.width;
            buffer.height = rawImg.height;
            const bCtx = buffer.getContext('2d');
            bCtx.drawImage(rawImg, 0, 0);

            const idata = bCtx.getImageData(0, 0, buffer.width, buffer.height);
            const data = idata.data;
            // Loop through pixels
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                // If pixel is black (or very dark)
                if (r < 20 && g < 20 && b < 20) {
                    data[i + 3] = 0; // Set alpha to 0
                }
            }
            bCtx.putImageData(idata, 0, 0);
            robotSprite = buffer; // Use this canvas as the source
        };

        // --- Classes ---

        class Bullet {
            constructor(x, y, targetX, targetY) {
                this.x = x;
                this.y = y;
                this.speed = 10;
                this.life = 60; // Frames to live
                this.color = '#ff0055';

                // Calculate velocity direction
                const dx = targetX - x;
                const dy = targetY - y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Avoid division by zero
                if (dist === 0) {
                    this.vx = 0;
                    this.vy = 0;
                } else {
                    this.vx = (dx / dist) * this.speed;
                    this.vy = (dy / dist) * this.speed;
                }
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life--;
            }

            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            }
        }

        class Bot {
            constructor(canvasWidth, canvasHeight, index, totalBots) {
                // 1. Formation Position (Vertical Line on Left)
                this.formationX = 60; // Fixed left margin
                const spacing = canvasHeight / (totalBots + 1);
                this.formationY = spacing * (index + 1);

                // 2. Battle Position (Random Scatter)
                this.battleX = Math.random() * canvasWidth;
                this.battleY = Math.random() * canvasHeight;

                // Start at formation
                this.x = this.formationX;
                this.y = this.formationY;

                this.vx = 0;
                this.vy = 0;

                this.size = 30 + Math.random() * 20;
                this.angle = 0;
                this.cooldown = Math.random() * 300;
            }

            update(width, height, mousePosition) {
                const isHostile = hostileRef.current;

                // --- Target Selection ---
                let targetX, targetY;

                if (!isHostile) {
                    // Formation: Fixed line
                    targetX = this.formationX;
                    targetY = this.formationY;
                } else {
                    // Attack: Swarm the cursor!
                    // Target is mouse position. 
                    // We add a 'per-bot' offset (using battleX/Y as randomness source) to make them surround it randomly
                    // scale battle offset down
                    const offsetX = (this.battleX / width - 0.5) * 300;
                    const offsetY = (this.battleY / height - 0.5) * 300;

                    // If mouse is offscreen, swarm center
                    const mx = mousePosition.x > -100 ? mousePosition.x : width / 2;
                    const my = mousePosition.y > -100 ? mousePosition.y : height / 2;

                    targetX = mx + offsetX;
                    targetY = my + offsetY;
                }

                // --- Physics Constants ---
                const friction = 0.92; // Less friction for faster movement
                const springFactor = isHostile ? 0.02 : 0.05; // Strong snap to formation, looser swarm
                const repulsionRadius = 200;

                // --- Forces ---
                let ax = 0;
                let ay = 0;

                // Repulsion from Mouse
                // ONLY apply if Hostile (User said "initially not interactive")
                // Actually, if we swarm the mouse, we probably WANT repulsion so they don't stack on top of it.
                // But in formation mode, NO repulsion.
                const dx = this.x - mousePosition.x;
                const dy = this.y - mousePosition.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (isHostile && dist < repulsionRadius) {
                    const angle = Math.atan2(dy, dx);
                    // Strong repulsion to keep a "combat distance"
                    const force = (repulsionRadius - dist) * 0.01;
                    ax += Math.cos(angle) * force;
                    ay += Math.sin(angle) * force;
                }

                // Spring to Target
                const homeDx = targetX - this.x;
                const homeDy = targetY - this.y;
                ax += homeDx * springFactor;
                ay += homeDy * springFactor;

                // Apply
                this.vx += ax;
                this.vy += ay;

                // Friction
                this.vx *= friction;
                this.vy *= friction;

                // Move
                this.x += this.vx;
                this.y += this.vy;

                // Bobbing
                this.angle += 0.05;

                // --- 2. Firing Logic ---
                // Only fire if INTRUSION DETECTED (Hostile Mode) and player is alive
                if (isHostile && mousePosition.x > -100 && !isDead) {
                    // Fire if close enough
                    if (dist < 800 && this.cooldown <= 0) { // Increased range for battle
                        this.fire(mousePosition);
                        this.cooldown = 60 + Math.random() * 60; // Fast fire
                    } else {
                        this.cooldown--;
                    }
                }
            }

            fire(target) {
                bullets.push(new Bullet(this.x, this.y, target.x, target.y));
            }

            draw(ctx) {
                const isHostile = hostileRef.current;

                ctx.save();
                ctx.translate(this.x, this.y);
                // Apply bobbing to the visuals, not physics origin
                const bobY = Math.sin(this.angle) * 5;
                ctx.translate(0, bobY);

                if (robotSprite) {
                    ctx.drawImage(robotSprite, -this.size / 2, -this.size / 2, this.size, this.size);
                } else if (rawImg.complete && rawImg.naturalHeight !== 0) {
                    // If sprite not yet processed (edge case), draw raw
                    ctx.drawImage(rawImg, -this.size / 2, -this.size / 2, this.size, this.size);
                } else {
                    ctx.fillStyle = '#39ff14'; // Neon Green Fallback
                    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                }

                // Add red overlay when hostile (red eyes effect) - preserves transparency
                if (isHostile) {
                    ctx.globalCompositeOperation = 'source-atop';
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                    ctx.globalCompositeOperation = 'source-over'; // Reset
                }

                ctx.restore();
            }
        }

        // --- Health Bar Rendering ---
        const drawHealthBar = (cx, cy) => {
            if (mouse.x < -100 || !hostileRef.current) return; // only in hostile mode and while cursor is on screen

            const barWidth = 60;
            const barHeight = 7;
            const barX = cx - barWidth / 2;
            const barY = cy - 38; // above cursor

            const healthFrac = Math.max(0, playerHealth / MAX_HEALTH);

            // Background track
            ctx.save();
            ctx.globalAlpha = 0.85;
            ctx.beginPath();
            ctx.roundRect(barX - 1, barY - 1, barWidth + 2, barHeight + 2, 4);
            ctx.fillStyle = '#111';
            ctx.fill();

            // Health fill — green → yellow → red based on fraction
            let fillColor;
            if (healthFrac > 0.5) {
                fillColor = `hsl(${120 * healthFrac * 2}, 100%, 45%)`;
            } else {
                fillColor = `hsl(${120 * healthFrac}, 100%, 45%)`;
            }

            if (healthFrac > 0) {
                ctx.beginPath();
                ctx.roundRect(barX, barY, barWidth * healthFrac, barHeight, 3);
                ctx.fillStyle = fillColor;
                ctx.shadowBlur = 8;
                ctx.shadowColor = fillColor;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // Border
            ctx.beginPath();
            ctx.roundRect(barX - 1, barY - 1, barWidth + 2, barHeight + 2, 4);
            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // HP label — small text
            ctx.font = 'bold 9px monospace';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.textAlign = 'center';
            ctx.fillText(`HP ${playerHealth}/${MAX_HEALTH}`, cx, barY - 4);

            ctx.globalAlpha = 1;
            ctx.restore();
        };

        // NOTE: death screen is now a DOM overlay — drawDeathScreen removed from canvas

        // --- Bullet-Cursor Collision ---
        const checkBulletHits = () => {
            if (isDead || mouse.x < -100 || !hostileRef.current) return;

            for (let i = bullets.length - 1; i >= 0; i--) {
                const b = bullets[i];
                const dx = b.x - mouse.x;
                const dy = b.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < HIT_RADIUS) {
                    bullets.splice(i, 1); // destroy bullet
                    playerHealth = Math.max(0, playerHealth - 1);
                    hitFlash = 12; // show flash for 12 frames
                    if (playerHealth <= 0) {
                        isDead = true;
                        deathTimer = 0;
                        setShowDeathPanel(true);
                        // Notify parent — collapses intrusion overlay and returns bots to formation
                        if (onPlayerDeath) onPlayerDeath();
                    }
                }
            }
        };

        // --- Hit Flash Overlay ---
        const drawHitFlash = () => {
            if (hitFlash <= 0) return;
            const alpha = (hitFlash / 12) * 0.35;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#ff0033';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
            hitFlash--;
        };

        // --- Logic ---

        const initBots = () => {
            // Reset arrays
            bots = [];
            bullets = [];

            // Reset player state on resize
            playerHealth = MAX_HEALTH;
            isDead = false;
            deathTimer = 0;
            hitFlash = 0;

            const width = canvas.width;
            const height = canvas.height;
            const area = width * height;
            // Very sparse: approx 1 bot per 150000 pixels
            const count = Math.min(8, Math.floor(area / 150000));
            console.log(`Spawning ${count} bots for ${width}x${height}`);

            for (let i = 0; i < Math.max(4, count); i++) {
                bots.push(new Bot(width, height, i, Math.max(4, count)));
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initBots();
        };

        const animate = () => {
            // Clear screen
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isDead) {
                // Bots keep drawing (they've returned to formation)
                bots.forEach(bot => { bot.draw(ctx); });

                // Drive the DOM overlay opacity & dots from animation loop
                if (deathPanelRef.current) {
                    const fadeIn = Math.min(1, deathTimer / 30);
                    deathPanelRef.current.style.opacity = fadeIn;
                }
                if (dotsRef.current) {
                    const dots = Math.floor((deathTimer / 150) * 5);
                    dotsRef.current.textContent = 'RESETTING' + '.'.repeat(dots + 1);
                }

                deathTimer++;

                // ~2.5s then reset
                if (deathTimer > 150) {
                    isDead = false;
                    playerHealth = MAX_HEALTH;
                    deathTimer = 0;
                    bullets = [];
                    setShowDeathPanel(false);
                }
            } else {
                // Update & Draw Bots
                bots.forEach(bot => {
                    bot.update(canvas.width, canvas.height, mouse);
                    bot.draw(ctx);
                });

                // Check collisions BEFORE drawing bullets (so removed bullets don't flash)
                checkBulletHits();

                // Update & Draw Bullets
                // Iterate backwards to allow removal
                for (let i = bullets.length - 1; i >= 0; i--) {
                    const b = bullets[i];
                    b.update();
                    b.draw(ctx);
                    if (b.life <= 0) {
                        bullets.splice(i, 1);
                    }
                }

                // Draw hit flash overlay
                drawHitFlash();

                // Draw health bar above cursor
                drawHealthBar(mouse.x, mouse.y);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // --- Handlers ---
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        // --- Start ---
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        rawImg.onload = () => {
            processImage();
            resize();
            // animate is already running, no need to restart, sprite will just appear
        };

        // If cached/already loaded
        if (rawImg.complete) {
            processImage();
            resize(); // Ensure bot count correct
        }

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50"
            />

            {/* THREAT NEUTRALIZED — DOM overlay so it's above all page content */}
            {showDeathPanel && (
                <div
                    ref={deathPanelRef}
                    style={{ opacity: 0, transition: 'none' }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
                >
                    <div style={{
                        background: 'rgba(0,10,5,0.97)',
                        border: '1.5px solid #00ff88',
                        borderRadius: '6px',
                        boxShadow: '0 0 40px #00ff88, 0 0 80px rgba(0,255,136,0.3)',
                        padding: '0',
                        width: 'min(520px, 85vw)',
                        fontFamily: 'monospace',
                        overflow: 'hidden',
                    }}>
                        {/* Top accent stripe */}
                        <div style={{
                            height: '2px',
                            background: 'linear-gradient(to right, transparent, #00ff88 20%, #00ff88 80%, transparent)',
                        }} />

                        <div style={{ padding: '16px 20px 20px' }}>
                            {/* Header */}
                            <div style={{ fontSize: '11px', color: '#00ff88', fontWeight: 'bold', marginBottom: '10px' }}>
                                // SYSTEM STATUS REPORT
                            </div>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'rgba(0,255,136,0.2)', marginBottom: '16px' }} />

                            {/* Checkmark */}
                            <div style={{
                                textAlign: 'center',
                                fontSize: '34px',
                                color: '#00ff88',
                                textShadow: '0 0 20px #00ff88',
                                marginBottom: '8px',
                            }}>✓</div>

                            {/* Title */}
                            <div style={{
                                textAlign: 'center',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#00ff88',
                                textShadow: '0 0 15px #00ff88',
                                letterSpacing: '2px',
                                marginBottom: '10px',
                            }}>THREAT NEUTRALIZED</div>

                            {/* Subtitle */}
                            <div style={{
                                textAlign: 'center',
                                fontSize: '12px',
                                color: 'rgba(0,255,136,0.65)',
                                letterSpacing: '1px',
                                marginBottom: '14px',
                            }}>ALL HOSTILE UNITS ELIMINATED — SYSTEMS NOMINAL</div>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'rgba(0,255,136,0.15)', marginBottom: '12px' }} />

                            {/* Dots countdown */}
                            <div
                                ref={dotsRef}
                                style={{
                                    textAlign: 'center',
                                    fontSize: '11px',
                                    color: 'rgba(0,255,136,0.45)',
                                    letterSpacing: '2px',
                                }}
                            >RESETTING.</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BackgroundBots;
