# Product Requirement Document: Space Invaders Game (Mobile & Desktop)

## 1. Introduction
### 1.1 Background
Space Invaders is a landmark arcade game released in 1978 that defined the shoot-'em-up genre. Its simple premise—defend Earth from descending waves of aliens—remains engaging and addictive. This project aims to develop a modern, cross-platform version of Space Invaders that runs smoothly on both mobile devices and desktop browsers, capturing the classic feel while adapting to contemporary input methods.

### 1.2 Purpose
This document outlines the requirements for building a responsive Space Invaders game that provides an authentic experience across devices. It serves as a guide for the development team, designers, and testers to ensure a consistent, high-quality product.

### 1.3 Objectives
- Deliver a fully functional Space Invaders game with classic mechanics: waves of aliens, player cannon, shields, mystery ship, and increasing difficulty.
- Ensure seamless play on mobile (touch) and desktop (keyboard).
- Provide intuitive controls adapted to each platform: arrow keys + space on desktop; on-screen buttons and/or swipe on mobile.
- Include essential features: score, high score, lives, level progression, shield degradation.
- Optimize for performance, responsiveness, and accessibility.

## 2. Scope
### 2.1 In-Scope
- Classic Space Invaders gameplay: player cannon at bottom, rows of aliens moving horizontally and descending.
- Aliens shoot projectiles downward; player cannon shoots upward.
- Four rows of aliens (typically 11 columns × 5 rows, but classic had 5 rows of 11; we can use standard 5 rows of 10 or 11; specify).
- Different alien types with different point values (top row = higher points).
- Mystery ship (UFO) that flies across the top for bonus points.
- Shields (4) that degrade with hits from both player and alien shots.
- Player lives (start with 3).
- Scoring display, high score saved locally.
- Level progression: after clearing a wave, new wave starts faster (increased alien speed and firing rate).
- Game states: Start screen, Active game, Pause, Game Over.
- Responsive design for desktop (landscape) and mobile (portrait/landscape).

### 2.2 Out-of-Scope
- Online multiplayer or leaderboards.
- Power-ups or special weapons.
- Customizable themes or skins.
- Advanced particle effects or 3D graphics.
- Account systems or cloud saves.

## 3. User Personas
| Persona | Description | Goals |
|---------|-------------|-------|
| **Casual Mobile Player** | Plays during short breaks. Wants quick, responsive touch controls. | Easy one-handed play, fast restart, clear visuals. |
| **Retro Enthusiast (Desktop)** | Familiar with original Space Invaders. Expects authentic mechanics, increasing speed, and high score challenge. | Precise keyboard controls, faithful reproduction, competitive scoring. |
| **New Player (Both)** | May not know original rules. Needs simple instructions and gradual difficulty. | Clear feedback on what to do, visible scoring, lives indication. |

## 4. Functional Requirements
### 4.1 Core Game Mechanics
- **Player Cannon**: Positioned at bottom center, moves left/right within screen bounds. Cannot move past edges.
- **Aliens**: Arranged in rows (e.g., 5 rows of 10 aliens). Initially move right, step down when hitting edge, reverse direction. Speed increases as fewer aliens remain.
- **Alien Types**:
  - Top row: Squid (30 pts) – often in classic.
  - Middle rows: Crab (20 pts).
  - Bottom rows: Octopus (10 pts).
- **Mystery Ship**: Randomly appears at top, moves left to right (or right to left). Scores bonus (e.g., 50–300 pts, random or based on hit count).
- **Projectiles**:
  - Player shots: Single shot on screen at a time (classic limitation). Shot speed consistent.
  - Alien shots: Randomly fired from remaining aliens; multiple shots can be on screen. Speed increases with fewer aliens.
- **Collisions**:
  - Player shot hits alien: alien removed, score added.
  - Player shot hits mystery ship: ship removed, bonus score.
  - Alien shot hits player: lose life, reset positions (aliens and player) if lives remain; shields remain degraded.
  - Shots hit shields: shield blocks/degrades; shield pixels can be eroded.
- **Shields**: 4 shields placed in front of player. Each shield is a matrix of pixels that can be destroyed by both player and alien shots. Collision detection per pixel.
- **Lives**: Player starts with 3 lives. Life lost when hit by alien shot or alien reaches bottom (aliens reaching bottom also cause game over).
- **Level Completion**: When all aliens are destroyed, next wave starts with faster aliens and possibly more aggressive firing.
- **Game Over**: When lives reach 0 or aliens reach bottom.

### 4.2 Controls
| Action | Desktop (Keyboard) | Mobile (Touch) |
|--------|-------------------|----------------|
| Move Left | Left Arrow | Swipe left OR on-screen left button / drag cannon left |
| Move Right | Right Arrow | Swipe right OR on-screen right button / drag cannon right |
| Shoot | Spacebar | On-screen shoot button (tap) |

*On mobile: Provide a draggable area or left/right buttons for movement, and a separate shoot button. Swipe gestures can be an alternative option for movement. Buttons must be large enough to avoid mis-taps.*

### 4.3 Game Features
- **Score Display**: Current score and high score prominently shown.
- **Lives Indicator**: Visual representation of remaining lives (e.g., small cannon icons).
- **Level / Wave Indicator**: Current wave number or remaining aliens count.
- **High Score**: Persistently stored in `localStorage`, updates when current score exceeds previous high.
- **Game States**:
  - **Start Screen**: Game title, high score, "Press any key / Tap to start". Option to view instructions.
  - **Active Game**: Main gameplay with cannon, aliens, shields, and UI.
  - **Pause**: Game freezes, overlay with Resume, Restart, and Quit to Start.
  - **Game Over**: Shows final score, high score, and buttons to Restart or go to Start.
- **Ready / Go Transition**: Brief countdown before level starts.

### 4.4 Additional Functionality
- **Restart**: Option to restart the game from wave 1.
- **Sound / Vibration** (optional): Toggle for classic sound effects (shoot, explosion, mystery ship). Haptic feedback on mobile for shooting and hits (optional, can be toggled).
- **Instructions**: Simple screen explaining controls, scoring, and rules.

## 5. Non-Functional Requirements
### 5.1 Performance
- Consistent 60 fps on mid-range devices.
- Input lag <100ms.
- No memory leaks; smooth long play sessions.

### 5.2 Responsiveness
- Layout adapts from 320px to 1920px width.
- On mobile, orientation changes (portrait ↔ landscape) must preserve game state and usable controls.
- Touch targets (buttons) must be at least 44×44 px.

### 5.3 Accessibility
- Colorblind-friendly mode: use shapes or patterns for alien types (optional).
- Keyboard navigation for menus (if any).
- Visual cues for hits and explosions.
- Clear feedback for all actions (button presses, shots, hits).

### 5.4 Reliability
- No crashes or freezes.
- Game state persists during orientation changes or accidental browser tab switching (session storage optional).

## 6. UI/UX Requirements
### 6.1 Layout
- **Desktop (landscape)**: Game area centered. Score and lives above the playfield. High score and level info displayed. Control hints may be shown.
- **Mobile (portrait)**: Playfield scaled to fit width, with score and lives above. On-screen movement buttons (left/right) and shoot button placed at bottom corners. Alternatively, a single touch area for dragging.
- **Mobile (landscape)**: Playfield on left, controls on right (vertical stack of left/right/shoot) to maximize play area.

### 6.2 Visual Design
- Faithful to classic but with clean, modern rendering (vector-like or pixel art).
- Distinct colors for alien rows (optional).
- Shields represented as pixel blocks that erode with hits.
- Explosions as simple sprite animations.
- Dark background with starfield effect optional.

### 6.3 Touch Controls
- **Directional Buttons**: Left and right arrow buttons placed for comfortable thumb reach.
- **Shoot Button**: Prominent, centrally located on bottom for easy tapping.
- **Drag Control**: Alternatively, allow dragging the cannon by touching anywhere on the bottom half of the screen (with shoot button separate).
- Button active states (press highlight) and optional haptic feedback.

### 6.4 Feedback
- **Visual**: Score pop-ups when destroying aliens; shield degradation visible; explosion animations.
- **Audio**: Classic sound effects (shoot, alien explosion, mystery ship siren, player death) – can be muted.
- **Vibration**: Short pulses on mobile for shooting and hits (optional, user-controlled).

## 7. Technical Requirements
### 7.1 Platform & Technologies
- **Language**: HTML5, CSS3, JavaScript (ES6+).
- **Rendering**: Canvas API (2D) for game objects; HTML elements for UI.
- **Game Loop**: `requestAnimationFrame` for smooth updates.
- **Responsive Design**: CSS Flexbox/Grid, media queries, viewport meta tag.
- **Touch Handling**: `touchstart`, `touchmove`, `touchend` with `preventDefault` to avoid scrolling. Implement drag detection for movement.
- **Storage**: `localStorage` for high scores.
- **No external libraries required**; can optionally use lightweight framework for UI if desired.

### 7.2 Browser Support
- Latest Chrome, Firefox, Safari, Edge (desktop and mobile).
- iOS Safari and Android Chrome fully supported.

### 7.3 Code Structure
- Modular JavaScript (ES6 modules) separating game logic (aliens, player, collisions, projectiles), rendering, input handling, UI.
- Clear separation for easy testing and future enhancements.

### 7.4 Testing
- Unit tests for core logic (collision detection, scoring, alien movement).
- Cross-device testing on real devices/emulators.

## 8. Constraints
- Development timeline: 4 weeks for MVP.
- Must be a faithful clone; avoid using copyrighted assets (original sounds, sprites) – create original or use open-licensed alternatives.
- No server-side; fully client-side.

## 9. Milestones
| Milestone | Description | Estimated Duration |
|-----------|-------------|---------------------|
| **M1: Core Engine** | Implement player movement, alien formation movement, shooting mechanics, basic collisions. | 1.5 weeks |
| **M2: Shields & Mystery Ship** | Add shields with pixel-based erosion, mystery ship spawning and scoring. | 1 week |
| **M3: UI & Desktop Controls** | Build desktop layout, keyboard controls, score/lives display, high score storage, game states. | 1 week |
| **M4: Mobile Adaptation** | Add touch controls (buttons/drag), responsive design, orientation handling. | 1 week |
| **M5: Polishing & Testing** | Sound effects (optional), animations, cross-device testing, bug fixing. | 0.5 week |
| **M6: Release** | Deploy, gather feedback. | – |

## 10. Success Metrics
- **Engagement**: Average session length > 5 minutes.
- **Retention**: 20% return rate after 24 hours.
- **Bug Reports**: <5 critical bugs post-release.
- **Cross-Platform Satisfaction**: Positive feedback from both mobile and desktop users.
- **Performance**: 60 fps on 90% of devices.

---

## Appendix: User Stories
| ID | Story |
|----|-------|
| US1 | As a player, I want to move the cannon left and right using arrow keys or touch so I can aim at aliens. |
| US2 | As a player, I want to shoot projectiles at aliens using spacebar or a button. |
| US3 | As a player, I want aliens to move faster as I destroy them, increasing challenge. |
| US4 | As a player, I want shields that protect me but degrade with hits, adding strategy. |
| US5 | As a player, I want a mystery ship to appear occasionally for bonus points. |
| US6 | As a player, I want my score, high score, and remaining lives displayed so I can track progress. |
| US7 | As a mobile player, I want responsive touch controls that are easy to use without obscuring the game. |
| US8 | As a desktop player, I want precise keyboard controls that feel responsive. |
| US9 | As a player, I want the game to remember my highest score across sessions. |
| US10 | As a player, I want to pause the game if I need to take a break. |

---

This PRD provides a comprehensive foundation for developing a cross-platform Space Invaders game. Adjustments can be made based on team needs or user feedback during development.