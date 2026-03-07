# Product Requirement Document: Pac-Man Game (Mobile & Desktop)

## 1. Introduction
### 1.1 Background
Pac-Man is a timeless arcade classic that has captivated players since its release in 1980. The game's simple yet challenging maze chase gameplay makes it ideal for quick sessions on both mobile and desktop. This project aims to recreate the authentic Pac-Man experience with modern responsive design, ensuring seamless play across devices.

### 1.2 Purpose
This document outlines the requirements for developing a Pac-Man game that works flawlessly on mobile devices (touch) and desktop browsers (keyboard). It serves as a guide for development, design, and testing teams to deliver a faithful, high-quality adaptation.

### 1.3 Objectives
- Deliver a fully functional Pac-Man game with classic rules and maze design.
- Ensure smooth gameplay on both mobile and desktop platforms.
- Provide intuitive controls adapted to each device: keyboard arrows on desktop, touch/swipe or virtual joystick on mobile.
- Include essential features: score, high score, lives, level progression, ghost behaviors, fruit bonuses.
- Optimize for performance, responsiveness, and accessibility.

## 2. Scope
### 2.1 In-Scope
- Classic Pac-Man maze layout (similar to the original).
- Core gameplay: Pac-Man navigates maze, eats pellets, avoids ghosts.
- Power pellets that temporarily turn ghosts blue and vulnerable.
- Four ghosts (Blinky, Pinky, Inky, Clyde) with distinct personalities and behaviors (scatter, chase, frightened, eye return).
- Scoring system: pellets (10 pts), power pellets (50 pts), ghosts (200, 400, 800, 1600 pts per consecutive eat), fruit (bonus points).
- Level progression: increased difficulty (ghost speed, duration of frightened mode, etc.) after each level.
- Lives system (start with 3 lives, lose a life when caught, game over when lives = 0).
- Fruit bonus that appears twice per level.
- High score saved locally.
- Responsive design for desktop (landscape) and mobile (portrait/landscape).
- Game states: Start screen, Active game, Pause, Game Over.

### 2.2 Out-of-Scope
- Multiplayer or online leaderboards.
- Custom maze editors or user-generated content.
- Power-ups beyond original (e.g., speed boost, invincibility).
- Advanced cutscenes or intermissions (optional for MVP).
- Account systems or cloud saves.

## 3. User Personas
| Persona | Description | Goals |
|---------|-------------|-------|
| **Casual Mobile Player** | Plays during short breaks or commute. Wants quick, intuitive touch controls. | Easy one-handed play, fast restart, clear visuals. |
| **Retro Enthusiast (Desktop)** | Familiar with original Pac-Man. Expects authentic mechanics, ghost behaviors, and scoring. | Precise keyboard controls, faithful reproduction, high score challenge. |
| **New Player (Both)** | May not know original rules. Needs simple instructions and gradual difficulty. | Clear feedback on what to do, forgiving early levels, visible scoring. |

## 4. Functional Requirements
### 4.1 Core Game Mechanics
- **Maze**: Grid-based layout (28×31 cells) with tunnels that wrap Pac-Man and ghosts from left to right. Walls block movement.
- **Pellets**: 240 small pellets (10 pts each) placed throughout the maze. Must be eaten to complete level.
- **Power Pellets**: 4 large pellets (50 pts each) located near corners. When eaten, ghosts become frightened for a limited time (scoring bonus for eating them).
- **Ghosts**:
  - Blinky (red): Directly chases Pac-Man. Speed increases as pellets decrease.
  - Pinky (pink): Aims for a position four tiles ahead of Pac-Man's direction.
  - Inky (cyan): Complex behavior using Blinky's position and Pac-Man's direction.
  - Clyde (orange): Chases until close, then scatters.
- **Ghost Modes**:
  - **Scatter**: Ghosts target their respective corners.
  - **Chase**: Ghosts use their unique targeting logic.
  - **Frightened**: Ghosts turn blue, move randomly, and can be eaten by Pac-Man.
  - **Eaten**: Ghosts turn into eyes and return to the ghost house at double speed.
- **Fruit**: Appears twice per level near the center. Scores vary by level (e.g., cherry 100, strawberry 300, etc.).
- **Lives**: Player starts with 3 lives. Losing a life resets positions but not pellets. Game over when lives reach 0.
- **Level Completion**: When all pellets are eaten, the player advances to the next level, with increased difficulty (ghost speed, frightened duration reduced, etc.).

### 4.2 Controls
| Action | Desktop (Keyboard) | Mobile (Touch) |
|--------|-------------------|----------------|
| Move Up | Up Arrow | Swipe up OR on-screen up button / joystick |
| Move Down | Down Arrow | Swipe down OR on-screen down button / joystick |
| Move Left | Left Arrow | Swipe left OR on-screen left button / joystick |
| Move Right | Right Arrow | Swipe right OR on-screen right button / joystick |
| Pause | P / Esc | On-screen pause button |

*On mobile, a virtual joystick or directional buttons should be provided. Swipe gestures can be an alternative option. The control area should be large enough to prevent mis-taps.*

### 4.3 Game Features
- **Score Display**: Current score and high score prominently shown.
- **Lives Indicator**: Visual representation of remaining lives (e.g., Pac-Man icons).
- **Level / Fruit Indicator**: Current level or next fruit displayed.
- **High Score**: Persistently stored in `localStorage`, updates when current score exceeds previous high.
- **Game States**:
  - **Start Screen**: Game title, high score, "Press any key / Tap to start". Option to view instructions.
  - **Active Game**: Main gameplay with maze, Pac-Man, ghosts, and UI.
  - **Pause**: Game freezes, overlay with Resume, Restart, and Quit to Start.
  - **Game Over**: Shows final score, high score, and buttons to Restart or go to Start.
- **Ready / Go Transition**: Brief countdown before level starts.

### 4.4 Additional Functionality
- **Restart**: Option to restart the current game (lose a life? Typically restart from level 1). Clarify: Restart from beginning.
- **Sound / Vibration** (optional): Toggle for classic sound effects (waka, ghost eat, death, intermission). Haptic feedback on mobile for eating pellets/ghosts (optional, can be toggled).
- **Instructions**: Simple screen explaining controls, ghost behaviors, scoring.

## 5. Non-Functional Requirements
### 5.1 Performance
- Consistent 60 fps on mid-range devices.
- Input lag <100ms.
- No memory leaks; smooth long play sessions.

### 5.2 Responsiveness
- Layout adapts from 320px to 1920px width.
- On mobile, orientation changes (portrait ↔ landscape) must preserve game state and usable controls.
- Touch targets (buttons, joystick) must be at least 44×44 px.

### 5.3 Accessibility
- Colorblind-friendly mode: use patterns or adjustable ghost colors (optional).
- Keyboard navigation for menus (if any).
- Visual cues for ghost states (frightened, returning eyes) beyond color (e.g., eyes visible, flashing).
- Clear feedback for all actions (button presses, pellet consumption sounds/visuals).

### 5.4 Reliability
- No crashes or freezes.
- Game state persists during orientation changes or accidental browser tab switching (session storage optional).

## 6. UI/UX Requirements
### 6.1 Layout
- **Desktop (landscape)**: Maze centered. Score, lives, and level info displayed above or to the sides. Control hints may be shown.
- **Mobile (portrait)**: Maze scaled to fit width, with score and lives above. Virtual controls (d-pad or joystick) placed at bottom. Possibly rearrange info to avoid clutter.
- **Mobile (landscape)**: Maze on left, controls and info on right to maximize play area.

### 6.2 Visual Design
- Faithful to original but with clean, modern rendering (sharp lines, vibrant colors).
- Pac-Man and ghosts animated (mouth opening/closing, ghost eyes).
- Maze lines, pellets visible.
- Power pellets larger and glowing slightly.
- Fruit sprite recognizable.
- Dark background with neon-like maze edges optional.

### 6.3 Touch Controls
- **Virtual Joystick**: Positioned for comfortable thumb reach; provides 4-directional input.
- **Directional Buttons**: Alternatively, four arrow buttons arranged in a cross.
- Button active states (press highlight) and optional haptic feedback.
- Swipe gestures: swipe direction changes Pac-Man's direction if valid.

### 6.4 Feedback
- **Visual**: Score pop-ups when eating ghosts or fruit; flashing when Pac-Man is hit; ghost eyes when returning.
- **Audio**: Classic sound effects (waka waka, eat ghost, death, intermission) – can be muted.
- **Vibration**: Short pulses on mobile for key events (optional, user-controlled).

## 7. Technical Requirements
### 7.1 Platform & Technologies
- **Language**: HTML5, CSS3, JavaScript (ES6+).
- **Rendering**: Canvas API (2D) for maze, characters; HTML elements for UI.
- **Game Loop**: `requestAnimationFrame` for smooth updates.
- **Responsive Design**: CSS Flexbox/Grid, media queries, viewport meta tag.
- **Touch Handling**: `touchstart`, `touchmove`, `touchend` with `preventDefault` to avoid scrolling. Implement gesture detection for swipes.
- **Storage**: `localStorage` for high scores.
- **No external libraries required**; can optionally use lightweight framework for UI if desired.

### 7.2 Browser Support
- Latest Chrome, Firefox, Safari, Edge (desktop and mobile).
- iOS Safari and Android Chrome fully supported.

### 7.3 Code Structure
- Modular JavaScript (ES6 modules) separating game logic (maze, ghosts, Pac-Man), rendering, input handling, UI.
- Clear separation for easy testing and future enhancements.

### 7.4 Testing
- Unit tests for core logic (collision, ghost modes, scoring).
- Cross-device testing on real devices/emulators.

## 8. Constraints
- Development timeline: 5 weeks for MVP.
- Must be a faithful clone; avoid using copyrighted assets (original sounds, sprites) – create original or use open-licensed alternatives.
- No server-side; fully client-side.

## 9. Milestones
| Milestone | Description | Estimated Duration |
|-----------|-------------|---------------------|
| **M1: Core Engine & Maze** | Implement grid, Pac-Man movement, pellet detection, collision with walls, basic scoring. | 2 weeks |
| **M2: Ghost AI & Modes** | Implement all four ghosts with scatter/chase/frightened modes, eye return, and basic difficulty scaling. | 1.5 weeks |
| **M3: UI & Desktop Controls** | Build desktop layout, keyboard controls, score display, lives, level progression, fruit. | 1 week |
| **M4: Mobile Adaptation** | Add touch controls (virtual joystick/buttons, swipe), responsive design, orientation handling. | 1 week |
| **M5: Polishing & Testing** | High score storage, pause, game over, sound (optional), animations, cross-device testing. | 1 week |
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
| US1 | As a player, I want to move Pac-Man through the maze using arrow keys or touch so I can eat pellets. |
| US2 | As a player, I want to see ghosts behave differently (chase, scatter) to create a challenge. |
| US3 | As a player, I want to eat power pellets to temporarily turn ghosts blue and eat them for bonus points. |
| US4 | As a player, I want my score, high score, and remaining lives displayed so I can track progress. |
| US5 | As a player, I want the fruit to appear for extra points. |
| US6 | As a mobile player, I want a responsive joystick or buttons that are easy to use without obscuring the maze. |
| US7 | As a desktop player, I want precise keyboard controls that feel responsive. |
| US8 | As a player, I want the game to remember my highest score across sessions. |
| US9 | As a player, I want to pause the game if I need to take a break. |
| US10 | As a player, I want clear feedback when I eat pellets, ghosts, or when I lose a life. |

---

This PRD provides a comprehensive foundation for developing a cross-platform Pac-Man game. Adjustments can be made based on team needs or user feedback during development.