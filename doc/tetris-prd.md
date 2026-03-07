# Product Requirement Document: Tetris Game (Mobile & Desktop)

## 1. Introduction
### 1.1 Background
Tetris is one of the most iconic puzzle games of all time. Its simple yet addictive mechanics have entertained players for decades. This project aims to develop a modern, cross-platform version of Tetris that runs smoothly on both mobile devices and desktop browsers, providing an authentic and engaging experience.

### 1.2 Purpose
The purpose of this document is to define the requirements for building a responsive Tetris game that adapts to different screen sizes and input methods. It serves as a guide for the development team, stakeholders, and testers to ensure a consistent and high-quality product.

### 1.3 Objectives
- Deliver a fully functional Tetris game with classic rules.
- Ensure seamless play on mobile (touch) and desktop (keyboard).
- Provide a clean, intuitive user interface that works across devices.
- Include essential features: score, level, next piece preview, hold piece, and local high score.
- Optimize for performance and responsiveness.

## 2. Scope
### 2.1 In-Scope
- Core gameplay mechanics (falling tetrominoes, rotation, movement, line clearing, scoring, level progression).
- Support for both keyboard (desktop) and touch (mobile) controls.
- Responsive design that adapts to portrait and landscape orientations.
- Local storage for saving high scores.
- Game states: Start screen, Active game, Pause, Game Over.
- Basic UI components: game board, score panel, next piece preview, hold piece.

### 2.2 Out-of-Scope
- Online multiplayer or leaderboards.
- Power-ups or special game modes (e.g., marathon, ultra).
- Customizable themes or skins (may be considered post-MVP).
- Account systems or cloud saves.

## 3. User Personas
| Persona | Description | Goals |
|---------|-------------|-------|
| **Casual Commuter (Mobile)** | Plays short sessions on phone during commute. Wants quick, intuitive controls and no complex setup. | Easy one-handed play, fast game start, clear visuals. |
| **Desktop Gamer (Desktop)** | Plays during breaks at work or at home. Prefers precise keyboard controls and a larger view. | Responsive keyboard input, ability to pause, track high scores. |
| **Retro Enthusiast (Both)** | Familiar with classic Tetris. Expects authentic mechanics and minimal distractions. | Accurate rotation and collision, standard scoring, no gimmicks. |

## 4. Functional Requirements
### 4.1 Core Game Mechanics
- **Grid**: 10 columns × 20 rows.
- **Tetrominoes**: Seven standard shapes (I, O, T, L, J, S, Z), each with its own color.
- **Movement**:
  - Left/right: Move piece one column.
  - Soft drop: Move piece down one row (or faster continuous drop).
  - Hard drop: Instantly drop piece to the lowest possible position.
- **Rotation**: Rotate piece clockwise (90°). Wall kicks not required for MVP (standard simple rotation).
- **Line Clearing**: When a row is completely filled, it is removed, and rows above shift down. Multiple lines cleared at once award higher scores.
- **Scoring**:
  - Single line: 100 × level
  - Double line: 300 × level
  - Triple line: 500 × level
  - Tetris (4 lines): 800 × level
- **Level Progression**: Level increases every 10 lines cleared. Speed of falling increases with level.
- **Game Over**: When a new piece cannot enter the board (collision at spawn).

### 4.2 Controls
| Action | Desktop (Keyboard) | Mobile (Touch) |
|--------|-------------------|----------------|
| Move left | Left Arrow | Swipe left OR on-screen left button |
| Move right | Right Arrow | Swipe right OR on-screen right button |
| Rotate | Up Arrow / Spacebar | Tap / double-tap OR on-screen rotate button |
| Soft drop | Down Arrow | Swipe down OR on-screen down button |
| Hard drop | Spacebar (if not used for rotate) | Long press OR on-screen hard drop button |
| Hold piece | C / Shift | On-screen hold button |
| Pause | P / Esc | On-screen pause button |

*Note: On mobile, both swipe gestures and buttons should be available; user can choose in settings.*

### 4.3 Game Features
- **Next Piece Preview**: Display the next 1–3 pieces (MVP: 1 piece).
- **Hold Piece**: Allows player to store a piece for later use. Can only be used once per piece swap.
- **Score Display**: Current score, level, and lines cleared.
- **High Score**: Persistently store the highest score achieved on the device using `localStorage`.
- **Game States**:
  - **Start Screen**: Shows game title, high score, and "Tap / Press any key to start".
  - **Active Game**: Main gameplay with all UI elements.
  - **Pause**: Game freezes; overlay with Resume and Restart options.
  - **Game Over**: Shows final score, high score, and buttons to Restart or go to Start Screen.

### 4.4 Additional Functionality
- **Restart**: Option to start a new game at any time (from pause or game over).
- **Sound / Vibration** (optional): Toggle sound effects for line clears, rotations, etc. Haptic feedback on mobile for key actions (optional, can be enabled/disabled).

## 5. Non-Functional Requirements
### 5.1 Performance
- Game must run at a consistent 60 frames per second (fps) on mid-range devices.
- Input latency should be minimal (<100ms).
- No memory leaks; long play sessions should not degrade performance.

### 5.2 Responsiveness
- Layout must adapt seamlessly to screen widths from 320px to 1920px.
- On mobile, orientation changes (portrait ↔ landscape) should not break the UI or game state.
- Buttons on mobile should be large enough to tap easily (minimum 44×44 px).

### 5.3 Accessibility
- Colorblind-friendly mode (optional) – use patterns or adjust colors for common deficiencies.
- Keyboard navigation should follow standard expectations (no trapped focus).
- Visual feedback for all actions (button highlights, piece lock delay flash).

### 5.4 Reliability
- No crashes or unresponsive states.
- Game state should persist during orientation changes or browser tab switches (if feasible using session storage).

## 6. UI/UX Requirements
### 6.1 Layout
- **Desktop (landscape)**: Game board centered. Next piece and hold piece displayed on the right and left respectively (or both on one side). Score panel above or below the board.
- **Mobile (portrait)**: Board at the top, with next piece and hold piece arranged horizontally below the board. Virtual control buttons placed at the bottom for easy thumb access.
- **Mobile (landscape)**: Board on the left, controls and info panels on the right to utilize wider space.

### 6.2 Visual Design
- Clean, modern aesthetic with a dark theme (optional light theme toggle).
- Distinct colors for each tetromino, with subtle gradients or flat design.
- Clear typography for scores and labels.
- Animations for line clearing (flash and fade), piece lock, and game over.

### 6.3 Touch Controls
- Buttons should have active states (press effect) and possibly labels/icons.
- Swipe gestures should be detected with reasonable sensitivity (e.g., 30px minimum swipe).
- Option to disable gestures and rely solely on buttons.

### 6.4 Feedback
- Visual: Highlight button on press; piece flashes when locked; line clearing animation.
- Audio: Short sound effects for rotations, line clears, game over (optional).
- Haptic: Light vibration on mobile for key actions (if device supports).

## 7. Technical Requirements
### 7.1 Platform & Technologies
- **Language**: HTML5, CSS3, JavaScript (ES6+).
- **Rendering**: Canvas API (2D context) for the game board; HTML elements for UI.
- **Game Loop**: `requestAnimationFrame` for smooth updates.
- **Responsive Design**: CSS Flexbox/Grid with media queries; viewport meta tag.
- **Touch Events**: Handle `touchstart`, `touchmove`, `touchend` with preventDefault to avoid page scroll.
- **Storage**: `localStorage` for high scores.
- **No external libraries required** (though a lightweight framework like Vue or React can be used for UI components if desired, but core game logic should remain vanilla for performance).

### 7.2 Browser Support
- Latest versions of Chrome, Firefox, Safari, Edge (including mobile variants).
- iOS Safari and Android Chrome must be fully supported.

### 7.3 Code Structure
- Modular JavaScript (ES6 modules) separating game logic, rendering, input handling, and UI.
- Clear separation of concerns to facilitate testing and future enhancements.

### 7.4 Testing
- Unit tests for core logic (collision detection, line clearing, scoring).
- Cross-device testing on real devices or emulators.

## 8. Constraints
- Development timeline: 4 weeks for MVP (if applicable).
- Must adhere to classic Tetris guidelines to avoid legal issues (clone, not official).
- No server-side components; entirely client-side.

## 9. Milestones
| Milestone | Description | Estimated Duration |
|-----------|-------------|---------------------|
| **M1: Core Engine** | Implement grid, tetrominoes, movement, rotation, collision, line clearing, and game loop. | 2 weeks |
| **M2: Basic UI & Desktop Controls** | Build desktop layout, keyboard controls, score display, next piece, hold piece. | 1 week |
| **M3: Mobile Adaptation** | Add touch controls (buttons + gestures), responsive design, orientation handling. | 1 week |
| **M4: Polishing & Testing** | Implement high score storage, pause, game over screens, animations, sound (optional), cross-browser testing. | 1 week |
| **M5: Release** | Deploy to web server, gather feedback. | – |

## 10. Success Metrics
- **User Engagement**: Average session length > 5 minutes.
- **Retention**: Return rate after 24 hours > 20%.
- **Bug Reports**: Fewer than 5 critical bugs post-release.
- **Cross-Platform Satisfaction**: Positive feedback from both mobile and desktop users.
- **Performance**: Maintain 60 fps on 90% of tested devices.

---

## Appendix: User Stories
| ID | Story |
|----|-------|
| US1 | As a player, I want to move the falling piece left and right so I can position it accurately. |
| US2 | As a player, I want to rotate the piece to fit into tight spaces. |
| US3 | As a player, I want to see the next piece so I can plan ahead. |
| US4 | As a player, I want to hold a piece for later use to improve my strategy. |
| US5 | As a player, I want my score and level to be displayed so I can track progress. |
| US6 | As a mobile player, I want large, responsive buttons to control the game easily. |
| US7 | As a desktop player, I want keyboard controls that feel immediate and natural. |
| US8 | As a player, I want the game to remember my highest score across sessions. |
| US9 | As a player, I want to pause the game if I need to take a break. |
| US10 | As a player, I want clear feedback when I clear lines or the game ends. |

---

This PRD provides a comprehensive foundation for developing a cross-platform Tetris game. Adjustments can be made based on specific team needs or user feedback during development.