# Product Requirement Document: Mario Bros Web Game

| **Document Version** | 1.0 |
|---|---|
| **Last Updated** | 2025-03-27 |
| **Status** | Draft |
| **Owner** | Product Manager |

---

## 1. Introduction

### 1.1 Purpose
This document outlines the product requirements for a **Mario Bros game** developed as a web application. The game will be accessible via desktop and mobile browsers, delivering a faithful yet simplified recreation of the classic side‑scrolling platformer experience. It serves as a reference for design, development, and testing teams.

### 1.2 Scope
The initial release (MVP) will include:
- A single playable character (Mario).
- One complete world containing three levels.
- Core platforming mechanics: running, jumping, smashing blocks, collecting coins, and defeating enemies.
- Touch‑optimised controls for mobile and keyboard controls for desktop.
- Progressive web app (PWA) capabilities for offline play.

Out of scope for MVP: multiplayer, level editor, in‑app purchases, or advanced physics.

### 1.3 Definitions
| Term | Description |
|------|-------------|
| **PWA** | Progressive Web App – enables offline support and installation. |
| **MVP** | Minimum Viable Product – the first playable release. |
| **Enemy** | AI‑controlled characters that harm the player on contact (e.g., Goombas, Koopas). |
| **Power‑up** | Collectible items that grant temporary abilities (e.g., Super Mushroom). |

---

## 2. Product Overview

### 2.1 Background
The Mario franchise is one of the most recognised in video game history. This project aims to bring a lightweight, web‑based version of the classic gameplay to modern browsers, allowing users to enjoy a nostalgic experience without downloads or plugins. The game must be intuitive and responsive across all screen sizes.

### 2.2 Target Audience
- Casual gamers looking for a quick, fun experience.
- Nostalgic fans of the original Super Mario Bros.
- Mobile users who prefer browser games over native apps.
- All age groups (ESRB rating: E for Everyone).

### 2.3 User Goals
- Experience smooth, responsive platforming on any device.
- Complete levels by reaching the flagpole while collecting coins and avoiding enemies.
- Enjoy familiar mechanics (question blocks, power‑ups, enemy stomping).

### 2.4 Business Goals
- Drive traffic to the website through an engaging, shareable game.
- Demonstrate technical capability in cross‑platform web development.
- Gather user feedback for potential future enhancements (new worlds, multiplayer).

---

## 3. User Stories

| ID | User Story |
|----|------------|
| US‑01 | As a player, I want to move Mario left and right so that I can navigate the level. |
| US‑02 | As a player, I want Mario to jump so that I can avoid obstacles and reach higher platforms. |
| US‑03 | As a player, I want to see on‑screen controls when using a mobile device so that I can play without a keyboard. |
| US‑04 | As a player, I want to collect coins to increase my score and feel rewarded. |
| US‑05 | As a player, I want to break question blocks to reveal coins or power‑ups. |
| US‑06 | As a player, I want to stomp on enemies to defeat them and progress. |
| US‑07 | As a player, I want to receive visual and audio feedback when I collect items or defeat enemies. |
| US‑08 | As a player, I want the game to remember my score and progress through the three levels. |
| US‑09 | As a player, I want the game to be responsive so that I can play on both my phone and laptop without issues. |

---

## 4. Functional Requirements

### 4.1 Core Gameplay
| FR‑ID | Requirement |
|-------|-------------|
| FR‑01 | The game is a 2D side‑scrolling platformer. The camera follows the player as they move right. |
| FR‑02 | The player character (Mario) can run left/right and jump. Running speed increases after holding the direction for a short time. |
| FR‑03 | Mario can stand on solid ground, platforms, and bricks. |
| FR‑04 | Collision with an enemy reduces Mario’s size or ends the game (if already small). |
| FR‑05 | Reaching the flagpole at the end of a level advances to the next level or shows a victory screen. |
| FR‑06 | Falling into a pit or being crushed by a moving object results in life loss. |
| FR‑07 | The player starts with 3 lives. Game over occurs when all lives are lost. |

### 4.2 Controls
| FR‑ID | Requirement |
|-------|-------------|
| FR‑08 | **Desktop**: Arrow keys (left/right) for movement, Spacebar for jump. |
| FR‑09 | **Mobile**: On‑screen directional pad (left/right) and a jump button. Buttons are large, well‑spaced, and located near the bottom corners for easy thumb access. |
| FR‑10 | Touch controls should provide haptic‑like feedback (button highlight, slight vibration if device supports). |
| FR‑11 | The game detects device input method and shows/hides on‑screen controls accordingly. |

### 4.3 Levels
| FR‑ID | Requirement |
|-------|-------------|
| FR‑12 | Three distinct levels of increasing difficulty. |
| FR‑13 | Each level is built from tiles (ground, bricks, question blocks, pipes, platforms). |
| FR‑14 | Level design includes hidden areas, coin blocks, and at least one power‑up per level. |
| FR‑15 | Levels must be completable within 2–3 minutes for casual play. |

### 4.4 Characters
| FR‑ID | Requirement |
|-------|-------------|
| FR‑16 | Mario is the only playable character in MVP. He has two states: small and big (after collecting Super Mushroom). |
| FR‑17 | Big Mario can break brick blocks by jumping into them from below. |
| FR‑18 | Mario has a 1‑second invincibility period after taking damage (flashing sprite). |

### 4.5 Enemies
| FR‑ID | Requirement |
|-------|-------------|
| FR‑19 | Enemies include Goombas (walk back and forth) and Koopa Troopas (walk, hide in shell when stomped). |
| FR‑20 | Enemies respawn when they leave the screen? (No – they are destroyed when off-screen to save memory.) |
| FR‑21 | Stomping an enemy kills it and gives points. Stomping a Koopa shell can send it sliding to hit other enemies. |

### 4.6 Power‑ups
| FR‑ID | Requirement |
|-------|-------------|
| FR‑22 | Super Mushroom: makes Mario big (if small) or gives points (if already big). |
| FR‑23 | Fire Flower (optional for MVP, but can be included for extra fun): allows Mario to throw fireballs. |
| FR‑24 | Star (optional): temporary invincibility and increased speed. |

### 4.7 Scoring and Feedback
| FR‑ID | Requirement |
|-------|-------------|
| FR‑25 | Coin collection: +200 points. |
| FR‑26 | Enemy defeat: +100 points (Goomba), +200 points (Koopa by stomp), +500 points (Koopa shell multi‑hit). |
| FR‑27 | Score is displayed in the top‑left corner. |
| FR‑28 | Visual effects: coin twirl, enemy squish animation, block hit animation. |
| FR‑29 | On‑screen messages for “Level Complete”, “Game Over”, etc. |

### 4.8 Audio
| FR‑ID | Requirement |
|-------|-------------|
| FR‑30 | Background music for each level (looped). |
| FR‑31 | Sound effects: jump, coin collect, power‑up appear, power‑up collect, enemy stomp, game over, level complete. |
| FR‑32 | Mute button available on all screens. |

---

## 5. Non‑Functional Requirements

### 5.1 Performance
| NFR‑ID | Requirement |
|--------|-------------|
| NFR‑01 | Game should run at a consistent 60 frames per second on modern devices (desktop and mobile). |
| NFR‑02 | Initial load time (first playable frame) ≤ 3 seconds on a 4G connection. |
| NFR‑03 | No noticeable input lag (< 100 ms). |

### 5.2 Compatibility
| NFR‑ID | Requirement |
|--------|-------------|
| NFR‑04 | Supports latest versions of Chrome, Firefox, Safari, and Edge on desktop and mobile. |
| NFR‑05 | Works on iOS (Safari) and Android (Chrome) with touch support. |
| NFR‑06 | Responsive design adapts to screen widths from 320px to 1920px. |

### 5.3 Responsive Design
| NFR‑ID | Requirement |
|--------|-------------|
| NFR‑07 | Game canvas scales proportionally while maintaining aspect ratio (16:9 or 4:3 – choose 16:9 for widescreen). |
| NFR‑08 | On mobile, on‑screen controls are positioned absolutely and scale with viewport. |

### 5.4 Accessibility
| NFR‑ID | Requirement |
|--------|-------------|
| NFR‑09 | Colour schemes should have sufficient contrast for visually impaired users. |
| NFR‑10 | Game can be played with keyboard only (no mouse needed on desktop). |
| NFR‑11 | Option to mute audio. |

---

## 6. UI/UX Requirements

### 6.1 Desktop Layout
- Game canvas occupies the majority of the viewport, centered.
- Above the canvas: score display, remaining lives (as Mario heads), and mute button.
- No persistent on‑screen controls (keyboard only).

### 6.2 Mobile Layout
- Game canvas scaled to fit width; height may be letterboxed.
- Touch controls: left/right buttons (or a virtual joystick) at bottom left, jump button at bottom right.
- Buttons should be at least 44x44 pt for easy tapping.
- Option to hide controls if using a physical keyboard (Bluetooth).

### 6.3 Start & End Screens
- **Start screen**: Title, “Play” button, instructions (desktop: arrows+space, mobile: touch controls), mute toggle.
- **Pause screen**: Resume, Restart, Quit options.
- **Game Over screen**: Final score, “Play Again” button.

---

## 7. Technical Requirements

### 7.1 Platform
- Web‑based, delivered as a Progressive Web App (PWA) with a service worker for offline caching.
- No reliance on third‑party plugins (Flash, Unity Web Player) – pure HTML5/JavaScript.

### 7.2 Framework / Engine
- Use a lightweight game engine such as Phaser 3 or PixiJS for 2D rendering and physics.
- Ensure the engine supports both Canvas and WebGL renderers (fallback).

### 7.3 Assets
- All graphics (sprites, tiles, UI) should be vector‑based or high‑resolution PNGs with 2x scaling for Retina displays.
- Audio in MP3 and OGG formats for cross‑browser compatibility.
- Asset loading with progress indicator.

### 7.4 Backend (Optional)
- For MVP, no backend required – scores and progress stored locally (LocalStorage).
- Future versions may include online leaderboards.

---

## 8. Milestones and Timeline

| Milestone | Description | Estimated Date |
|-----------|-------------|----------------|
| **Kickoff** | Finalise PRD, assemble team, set up repo | Week 1 |
| **Prototype** | Basic movement, collision, one level draft | Week 3 |
| **Alpha** | All core gameplay features, 3 levels, desktop controls | Week 6 |
| **Beta** | Mobile controls, polish, audio integration | Week 8 |
| **Testing** | Cross‑browser and device testing, bug fixes | Week 9 |
| **Launch** | Deploy to web server, announce | Week 10 |

---

## 9. Risks and Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Copyright / trademark issues | High | Use original designs but ensure naming and assets are sufficiently different (parody / original art). Consider licensing if needed. |
| Performance on low‑end mobile devices | Medium | Optimise physics, use sprite atlases, test on multiple devices, offer low‑quality mode. |
| Touch controls feel unresponsive | High | Implement button press visual feedback, ensure proper hit areas, test extensively. |
| Scope creep (adding too many features) | Medium | Strict MVP definition; defer enhancements to post‑launch backlog. |

---

## 10. Appendices

### A. Mockup References
- [Link to wireframes] (to be created by design team)

### B. Asset List
- Character sprites (Mario small/big)
- Enemy sprites (Goomba, Koopa)
- Tile set (ground, bricks, question blocks, pipes, flagpole)
- UI elements (buttons, score panel, lives)
- Audio files (music, SFX)

---

**Approvals**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Manager | [Name] | | |
| Lead Developer | [Name] | | |
| UX Designer | [Name] | | |

---

*This document is confidential and proprietary. Unauthorised distribution is prohibited.*