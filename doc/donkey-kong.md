# Product Requirement Document: Donkey Kong Game (Mobile & Desktop)

## 1. Introduction
### 1.1 Background
Donkey Kong, released by Nintendo in 1981, is a landmark arcade game that introduced the world to Mario (originally named Jumpman) and established the platformer genre. Players must scale construction sites, evade rolling barrels, and rescue Pauline from the titular ape. Its tight controls, escalating difficulty, and iconic characters make it a timeless classic. This project aims to develop a modern, cross-platform version of Donkey Kong that faithfully recreates the original experience while adapting to contemporary devices.

### 1.2 Purpose
This document outlines the requirements for building a responsive Donkey Kong game that runs smoothly on both mobile devices (touch) and desktop browsers (keyboard). It serves as a guide for the development team, designers, and testers to ensure a consistent, high-quality product.

### 1.3 Objectives
- Deliver a fully functional Donkey Kong game with classic level design (four stages: 25m, 50m, 75m, 100m).
- Ensure seamless play on mobile and desktop with intuitive controls.
- Include essential features: scoring, lives, level progression, hammer power‑up, rivet mechanics, and local high score.
- Optimize for performance, responsiveness, and accessibility.

## 2. Scope
### 2.1 In-Scope
- **Levels**: The first four classic levels (25m, 50m, 75m, 100m) as seen in the original arcade version.
- **Characters**: Mario (Jumpman), Donkey Kong, Pauline.
- **Obstacles**: Rolling barrels, fireballs (levels 75m and 100m), conveyor belts (100m), rivets (100m).
- **Power‑up**: Hammer – allows Mario to smash barrels and fireballs temporarily.
- **Core Mechanics**: Running, jumping, climbing ladders, walking across girders, removing rivets (at the end of each level).
- **Scoring System**: Points for jumping over barrels, destroying barrels with hammer, removing rivets, reaching Pauline, and collecting other bonus items (e.g., umbrella, hat).
- **Lives**: Player starts with 3 lives; a life is lost when Mario touches an obstacle or falls.
- **Level Progression**: After completing a level, the next level begins with increased difficulty (faster barrels, more aggressive fireballs).
- **High Score**: Persistently stored in `localStorage`.
- **Game States**: Start screen, Active game, Pause, Game Over, Level Complete intermission.
- **Responsive Design**: Adapts to desktop (landscape) and mobile (portrait/landscape) with appropriate control schemes.

### 2.2 Out-of-Scope
- Additional levels beyond the original four (e.g., later arcade levels or homebrew content).
- Multiplayer or online leaderboards.
- Power‑ups beyond the hammer (e.g., extra lives, invincibility).
- Custom level editors or user‑generated content.
- Account systems or cloud saves.

## 3. User Personas
| Persona | Description | Goals |
|---------|-------------|-------|
| **Casual Mobile Player** | Plays during short breaks or commutes. Wants quick, responsive touch controls. | Easy one‑handed play, fast restart, clear visuals. |
| **Retro Enthusiast (Desktop)** | Familiar with the original Donkey Kong. Expects authentic mechanics, accurate level design, and challenging scoring. | Precise keyboard controls, faithful reproduction, high score competition. |
| **New Player (Both)** | May not know the original game. Needs simple instructions and gradual difficulty. | Clear feedback on what to do, visible lives and scoring, forgiving early levels. |

## 4. Functional Requirements
### 4.1 Core Game Mechanics
- **Movement**:
  - Mario can walk left/right on girders.
  - Mario can climb ladders up/down when positioned at a ladder.
  - Mario can jump (horizontal distance fixed, vertical arc). Jumping over obstacles is key.
- **Obstacles**:
  - **Barrels**: Roll down ramps; they can be jumped over or destroyed with the hammer. Barrels speed up as the game progresses.
  - **Fireballs**: Appear in later levels; bounce and move erratically; can also be destroyed with hammer.
  - **Conveyor Belts** (level 100m): Move Mario in the direction they run.
  - **Rivets** (level 100m): Mario must walk over them to remove them; once all are removed, the level ends.
- **Hammer Power‑up**: Appears at certain points. When picked up, Mario wields a hammer for a limited time, allowing him to smash barrels and fireballs. The hammer disappears after a few seconds or if Mario climbs a ladder.
- **Lives and Death**: Mario loses a life if he touches a barrel, fireball, or falls off the girders. Game over when lives reach zero.
- **Level Completion**:
  - **25m & 50m**: Mario must reach the top and touch Pauline.
  - **75m**: Mario must reach the top (fire level) and touch Pauline.
  - **100m**: Mario must remove all rivets; Donkey Kong then drops, and Mario can touch Pauline.
- **Scoring** (classic values, may be adjusted):
  - Jumping over a barrel: 100 pts
  - Destroying a barrel with hammer: 500 pts
  - Destroying a fireball: 500 pts
  - Removing a rivet: 500 pts (sometimes 800)
  - Collecting bonus items (umbrella, hat, purse): 300–800 pts
  - Reaching Pauline: 5000 pts (or level completion bonus)
- **Level Progression**: After each completed level, the game continues with the next level (infinite loop, but difficulty increases each cycle – e.g., faster barrels, more fireballs). After level 100m, the game returns to 25m with increased speed.

### 4.2 Controls
| Action | Desktop (Keyboard) | Mobile (Touch) |
|--------|-------------------|----------------|
| Move Left | Left Arrow | Swipe left OR on-screen left button / drag Mario left |
| Move Right | Right Arrow | Swipe right OR on-screen right button / drag Mario right |
| Jump | Spacebar | On-screen jump button (tap) |
| Climb Up | Up Arrow (on ladder) | Swipe up OR on-screen up button (when near ladder) |
| Climb Down | Down Arrow (on ladder) | Swipe down OR on-screen down button (when near ladder) |
| Hammer Attack | (Automatic when holding hammer – no separate button needed) | (Automatic) |
| Pause | P / Esc | On-screen pause button |

*On mobile: Provide directional buttons for left/right, jump, and climb (if near ladder). Alternatively, a swipe‑based control scheme can be offered as an option. Touch targets must be at least 44×44 px.*

### 4.3 Game Features
- **Score Display**: Current score and high score shown prominently.
- **Lives Indicator**: Remaining lives (e.g., Mario head icons).
- **Level Indicator**: Current level number or name (e.g., "25m").
- **High Score**: Saved in `localStorage`; updates when current score exceeds previous high.
- **Game States**:
  - **Start Screen**: Game title, high score, "Press any key / Tap to start". Option to view instructions.
  - **Active Game**: Gameplay with all elements.
  - **Pause**: Game freezes; overlay with Resume, Restart, and Quit to Start.
  - **Level Complete**: Brief animation/intermission before next level.
  - **Game Over**: Shows final score, high score, and buttons to Restart or go to Start.
- **Instructions**: Simple screen explaining controls, scoring, and basic rules.

### 4.4 Additional Functionality
- **Restart**: Option to restart the game from level 25m.
- **Sound / Vibration** (optional): Toggle for classic sound effects (jump, barrel smash, death, level complete). Haptic feedback on mobile for key actions (optional, user‑controlled).

## 5. Non-Functional Requirements
### 5.1 Performance
- Consistent 60 fps on mid‑range devices.
- Input lag <100ms.
- No memory leaks; smooth long play sessions.

### 5.2 Responsiveness
- Layout adapts from 320px to 1920px width.
- On mobile, orientation changes (portrait ↔ landscape) must preserve game state and usable controls.
- Touch targets ≥44×44 px.

### 5.3 Accessibility
- Colorblind‑friendly mode (optional): use shapes or patterns for critical elements.
- Keyboard navigation for menus.
- Visual feedback for all actions (button presses, jumps, hits).
- Clear indication of hammer timer.

### 5.4 Reliability
- No crashes or freezes.
- Game state persists during orientation changes or accidental browser tab switching (session storage optional).

## 6. UI/UX Requirements
### 6.1 Layout
- **Desktop (landscape)**: Game canvas centered. Score, lives, level info displayed above or to the sides. Control hints shown.
- **Mobile (portrait)**: Canvas scaled to fit width, with score and lives above. On‑screen buttons placed at bottom corners (left/right, jump, climb). Climb buttons appear only when near a ladder.
- **Mobile (landscape)**: Canvas on left, controls on right (vertical stack of left/right/jump/climb) to maximize play area.

### 6.2 Visual Design
- Faithful to original but with clean, modern rendering (pixel‑art style with smooth scaling).
- Distinct colors for each level background.
- Mario, barrels, fireballs, and hammer clearly animated.
- Score pop‑ups when destroying barrels or collecting items.
- Hammer timer displayed with a shrinking icon or bar.

### 6.3 Touch Controls
- **Directional Buttons**: Left/right placed for comfortable thumb reach. Jump button large and central. Climb up/down buttons appear contextually when Mario is on a ladder.
- **Swipe Gestures**: Optional; swiping left/right moves Mario; swiping up/down when on ladder climbs; tap to jump.
- Button active states (press highlight) and optional haptic feedback.

### 6.4 Feedback
- **Visual**: Mario flashing when hit; barrel/fireball explosion animation; score pop‑ups; level complete fanfare.
- **Audio**: Classic sound effects (jump, smash, death, music) – can be muted.
- **Vibration**: Short pulses on mobile for key events (optional, user‑controlled).

## 7. Technical Requirements
### 7.1 Platform & Technologies
- **Language**: HTML5, CSS3, JavaScript (ES6+).
- **Rendering**: Canvas API (2D) for game objects; HTML elements for UI.
- **Game Loop**: `requestAnimationFrame` for smooth updates.
- **Responsive Design**: CSS Flexbox/Grid, media queries, viewport meta tag.
- **Touch Handling**: `touchstart`, `touchmove`, `touchend` with `preventDefault` to avoid scrolling. Implement drag detection for movement (if using drag controls).
- **Storage**: `localStorage` for high scores.
- **No external libraries required**; can optionally use lightweight framework for UI if desired.

### 7.2 Browser Support
- Latest Chrome, Firefox, Safari, Edge (desktop and mobile).
- iOS Safari and Android Chrome fully supported.

### 7.3 Code Structure
- Modular JavaScript (ES6 modules) separating game logic (levels, physics, collisions), rendering, input handling, UI.
- Clear separation for easy testing and future enhancements.

### 7.4 Testing
- Unit tests for core logic (collision detection, scoring, level transitions).
- Cross‑device testing on real devices/emulators.

## 8. Constraints
- Development timeline: 5 weeks for MVP.
- Must be a faithful clone; avoid using copyrighted assets (original sounds, sprites) – create original or use open‑licensed alternatives.
- No server‑side; fully client‑side.

## 9. Milestones
| Milestone | Description | Estimated Duration |
|-----------|-------------|---------------------|
| **M1: Core Engine & Level 25m** | Implement Mario movement (walk, jump, climb), basic physics, barrel generation and rolling, collision detection, scoring. Build first level. | 2 weeks |
| **M2: Hammer & Additional Levels** | Add hammer power‑up, fireballs, conveyor belts, rivet mechanics, and remaining levels (50m, 75m, 100m). | 1.5 weeks |
| **M3: UI & Desktop Controls** | Build desktop layout, keyboard controls, score/lives display, high score storage, game states. | 1 week |
| **M4: Mobile Adaptation** | Add touch controls (buttons/swipe), responsive design, orientation handling. | 1 week |
| **M5: Polishing & Testing** | Sound effects (optional), animations, cross‑device testing, bug fixing. | 0.5 week |
| **M6: Release** | Deploy, gather feedback. | – |

## 10. Success Metrics
- **Engagement**: Average session length > 5 minutes.
- **Retention**: 20% return rate after 24 hours.
- **Bug Reports**: <5 critical bugs post‑release.
- **Cross‑Platform Satisfaction**: Positive feedback from both mobile and desktop users.
- **Performance**: 60 fps on 90% of devices.

---

## Appendix: User Stories
| ID | Story |
|----|-------|
| US1 | As a player, I want to move Mario left and right using arrow keys or touch so I can avoid obstacles. |
| US2 | As a player, I want to jump over barrels and other hazards using spacebar or a button. |
| US3 | As a player, I want to climb ladders to reach higher platforms. |
| US4 | As a player, I want to pick up the hammer to temporarily destroy barrels and fireballs. |
| US5 | As a player, I want to see my score, high score, and remaining lives displayed. |
| US6 | As a player, I want to progress through classic levels (25m, 50m, 75m, 100m). |
| US7 | As a mobile player, I want responsive touch controls that are easy to use without obscuring the game. |
| US8 | As a desktop player, I want precise keyboard controls that feel responsive. |
| US9 | As a player, I want the game to remember my highest score across sessions. |
| US10 | As a player, I want to pause the game if I need to take a break. |

---

This PRD provides a comprehensive foundation for developing a cross‑platform Donkey Kong game. Adjustments can be made based on team needs or user feedback during development.