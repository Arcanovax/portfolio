## Description

This project implements a multiplayer text-based adventure game built around a custom TCP client-server architecture. It allows multiple players to explore a shared world, communicate in real time, form groups, complete quests, trade items, and fight enemies.

The system is composed of three main components: an **asynchronous TCP server**, a **command-line client**, and a **graphical client**. All components are written in **Rust** and communicate through a line-based text protocol.

The main technical objective is to build a concurrent network server capable of handling multiple simultaneous connections, synchronizing shared game state, broadcasting real-time events, and persisting player progress across sessions.

The project was developed as part of the 42 curriculum by a team of three contributors.


<img src="/src/assets/tap_spawn.png" style="display: block; width: 100%; height: 100%;" />


## System Architecture

1. **Server**: Accepts TCP connections, parses incoming commands, executes game logic, manages the shared world, and sends responses and asynchronous events to connected clients.

2. **CLI Client**: Provides a terminal-based interface for interacting with the game through text commands. It handles server responses and real-time events without blocking user interaction.

3. **GUI Client**: Provides a graphical interface for exploring rooms, interacting with NPCs, managing inventory, completing quests, and participating in combat.

4. **Protocol**: Defines a line-based communication format with three message types: `OK` for successful responses, `ERR` for errors, and `EVT` for asynchronous events.

5. **Concurrency**: Uses Tokio to spawn one asynchronous task per client connection. Each task handles incoming commands and outgoing events concurrently, allowing players to receive updates even when they are not actively sending commands.

6. **State Management**: Maintains a shared world containing rooms, players, groups, combat encounters, and dungeons. A centralized command dispatcher routes requests to dedicated handlers, while an event-driven mechanism broadcasts changes to the relevant players.

7. **Persistence**: Loads the initial world from YAML configuration files and uses redb for persistent player and world state. Player data is saved on disconnection, while the world is saved periodically and during graceful shutdown.

8. **Game Systems**: Implements turn-based combat, quest progression, trading, group communication, and procedurally generated dungeons.

## Tech Stack

| Component | Technology |
|---|---|
| Language | Rust |
| Build system & workspace | Cargo |
| Asynchronous runtime | Tokio |
| Network communication | TCP sockets |
| Protocol | Line-based text protocol inspired by RFC 42TAP |
| CLI interface | Rust terminal client |
| GUI interface | Rust graphical client (Macroquad) |
| World configuration | YAML |
| Persistence | redb |
| Event communication | Tokio MPSC channels |


## Images

All the assets are from the game Stardew Valley, and I created the maps myself.

### Map

<img src="/src/assets/TAP/TAP_demo_map.png" style="display: block; width: 100%; height: 100%;" />

*This rendering was refined by AI to achieve a more realistic result.*
<br>

### Fight and Dungeon

<div style="display: flex; justify-content: center; flex-wrap: wrap; width: 100%; gap: 5px;">
  <img
    style="width: 49%; min-width: 300px; height: auto; margin:0;"
    src="/src/assets/TAP/TAP_demo_fight.png"
  />
  <img
    style="width: 49%; min-width: 300px; height: auto; margin:0;"
    src="/src/assets/TAP/TAP_demo_dungeon.png"
  />
</div>

The game features a multiplayer turn-based combat system and procedurally generated dungeons.
<br>

### Multiplayer and multi-channel chat

<img src="/src/assets/TAP/TAP_demo_chat.png" style="display: block; width: 100%; height: 100%; margin:0;" />

Three chat channels have been implemented: global chat, room chat, and group chat.
<br>

### Interactions with NPCs

<div style="display: flex; justify-content: center; flex-wrap: wrap; width: 100%; gap: 5px;">
  <img
    style="width: 59%; min-width: 300px; height: auto; margin:0;"
    src="/src/assets/TAP/TAP_demo_market.png"
  />
  <img
    style="width: 39%; min-width: 300px; height: auto; margin:0;"
    src="/src/assets/TAP/TAP_demo_shop.png"
  />
</div>

NPCs provide discussions, quests, riddles, and shops.
<br>



## Key Technical Choices

### Asynchronous client-server architecture

The server uses Tokio to handle multiple concurrent players without dedicating an operating-system thread to every connection.

Each connection runs in its own asynchronous task. A `select!` loop simultaneously monitors incoming socket data and the player's event queue, enabling the server to process commands and deliver notifications independently.

This architecture supports real-time multiplayer interactions while keeping connection management separate from game logic.

### Centralized command routing

Incoming messages are parsed into a typed `Command` enum and dispatched to dedicated handler modules.

Each handler implements a specific action, such as movement, combat, inventory management, or trading. Shared rules are enforced centrally before dispatch, while quest progression is handled through a common post-dispatch mechanism.

This design improves modularity, makes command handling easier to test, and reduces duplicated business logic.

### Event-driven communication

The server separates direct command responses from asynchronous game events.

When a player moves, joins a group, enters combat, or completes a quest, the server sends notifications through per-connection message channels. The task owning the destination socket is responsible for writing the event.

This avoids cross-task socket writes and allows room-level, group-level, and global broadcasts without coupling game handlers to individual client connections.

### Shared state and concurrency control

The game world is maintained in a shared `Arc<Mutex<ServerInfo>>` structure.

A standard-library mutex protects updates to the world, connections, groups, fights, and dungeons. Critical sections are kept short, and handlers release the lock before any network write or asynchronous suspension.

This approach keeps state transitions straightforward and avoids unnecessary asynchronous locking for synchronous game operations.

### Persistent world and player state

The initial world is defined through YAML configuration files, including rooms, exits, items, NPCs, and quests.

Dynamic state is persisted in redb, with bincode serialization for stored data. Player state is saved on disconnect, and world state is periodically saved and flushed during shutdown.

The server also performs a scheduled world reset every ten minutes, restoring configured world resources while preserving player-owned items. This requires carefully separating the baseline world from persistent player changes.

### Modular gameplay systems

The server implements several interconnected game mechanics:

- **Combat**: Turn-based fights with weapons, armor, healing items, and fleeing.
- **Quests**: Multi-step objectives involving item collection, delivery, dialogue, and riddles.
- **Groups**: Shared multiplayer interactions and group membership.
- **Economy**: Merchant interactions, buying, selling, and gold management.
- **Procedural dungeons**: Runtime-generated instances containing three to six rooms populated with existing enemies.

Quest progression is evaluated after commands and game events, keeping the progression engine separate from individual command handlers.

### Protocol design and error handling

The protocol uses newline-delimited UTF-8 messages with explicit success, error, and event frames.

The implementation extends the base command set to support additional gameplay features while preserving the same framing conventions. Typed commands, structured error names, and consistent message serialization make the protocol easier to parse and debug.

The server also distinguishes gameplay errors from transport and protocol errors, allowing clients and logs to handle them differently.


## What I Learned

### Game Development & 2D Graphics (Rust, Macroquad)

- Building a real-time graphical client with Macroquad: game loop, rendering of
  rooms, NPCs and players, camera handling, and animated sprites.
- Designing pixel-art maps from tilesets (Stardew Valley sprites), organised in
  separate layers (ground / foreground) to get depth and let the player walk
  behind objects.
- Implementing collision handling so the player respects walls, buildings,
  furniture and NPCs, and defining the walkable zones and exits of each room.
- Keeping the visual world consistent with the server's data: each room, exit and
  NPC defined in the YAML configuration has a matching map, position and sprite.
- Creating a visual identity for the game: item icons, NPC sprites, an inventory
  screen, and a dedicated fight map.

### GUI Architecture & Real-Time Event Handling

- Structuring the client into one module per feature (camera, chat, fight,
  inventory, quests, groups, dungeon, gambling, NPC dialogues, menus) to keep a
  growing codebase readable and maintainable.
- Reacting to server-pushed events (`EVT ...`) in real time: other players entering
  or leaving a room, chat messages, combat turns, quest updates, and world resets,
  while the player keeps interacting with the game.
- Turning protocol responses into visual feedback: HP and turn display in combat,
  quest progress, inventory updates, dialogue boxes, and error messages.
- Building dynamic interfaces: a dungeon whose doors switch between open and closed
  states, a slot-machine mini-game, group management, and in-game chat.

### Software Engineering & Teamwork

- Splitting a project into independent server, CLI, and GUI components.
- Working with a shared protocol contract between independently developed components.
- Making architectural trade-offs between simplicity, modularity, consistency, and maintainability.


## Links

- **Repository**: https://github.com/Arcanovax/TAP
- **Documentation**: See the repository README for architecture, protocol details, testing procedures, and build instructions.
