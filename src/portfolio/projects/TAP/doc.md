## Description

This project implements a multiplayer text-based adventure game (MUD) built around a custom TCP client-server architecture. It allows multiple players to explore a shared world, communicate in real time, form groups, complete quests, trade items, and fight enemies.

The system is composed of three main components: an asynchronous TCP server, a command-line client, and a graphical client. All components are written in Rust and communicate through a line-based text protocol inspired by RFC 42TAP.

The main technical objective is to build a concurrent network server capable of handling multiple simultaneous connections, synchronizing shared game state, broadcasting real-time events, and persisting player progress across sessions.

The project was developed as part of the 42 curriculum by a team of three contributors.

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
| GUI interface | Rust graphical client |
| World configuration | YAML |
| Persistence | redb |
| Serialization | bincode |
| Logging & diagnostics | tracing, tracing-subscriber |
| Event communication | Tokio MPSC channels |
| Shared state | Arc and Mutex |
| Testing | Rust unit tests and multiplayer integration scenarios |

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

### Structured logging and graceful shutdown

The server uses `tracing` and `tracing-subscriber` to produce human-readable console logs and structured JSON log files.

Connection spans associate events with a player and their network address, making it easier to investigate individual sessions and diagnose issues across concurrent connections.

On shutdown, the server saves persistent state and flushes connected players' data, reducing the risk of losing progress.

## Results

The repository documents a working multiplayer game architecture with the following implemented capabilities:

| Feature | Implementation |
|---|---|
| Concurrent TCP connections | Tokio tasks per client |
| Real-time communication | Per-connection event channels and broadcasts |
| Multiple interfaces | CLI and graphical clients |
| Shared game world | Centralized server state |
| Persistent progress | redb-backed player and world storage |
| Command processing | Typed commands and modular handlers |
| Combat and quests | Server-side gameplay engines |
| Group exploration | Multiplayer groups and shared dungeons |
| Procedural content | Runtime-generated dungeon instances |
| Diagnostics | Structured logging and configurable log levels |

The README describes testing procedures for multiplayer communication, combat, and quest progression. It does not provide a quantitative performance benchmark or numerical concurrency results, so no throughput or latency figures are claimed here.

## What I Learned

### Systems Programming & Networking

- Implementing a TCP server and a custom line-based communication protocol.
- Managing multiple simultaneous connections with asynchronous Rust.
- Separating direct responses from asynchronous event delivery.
- Designing message parsing, validation, error handling, and connection lifecycles.

### Rust & Concurrency

- Using Tokio tasks, `select!`, and message-passing channels.
- Managing shared state with `Arc<Mutex<T>>`.
- Understanding synchronization trade-offs and avoiding network I/O while holding locks.
- Organizing a multi-crate Cargo workspace with clear component boundaries.

### Backend Engineering

- Designing a centralized dispatcher and modular command handlers.
- Separating transport, business logic, state management, and persistence.
- Implementing structured serialization and database-backed state recovery.
- Handling graceful shutdown, periodic background tasks, and structured logging.

### Distributed State & Event-Driven Design

- Synchronizing a shared world across multiple connected clients.
- Broadcasting room, group, combat, and quest events.
- Keeping client interfaces synchronized with authoritative server state.
- Modeling complex interactions through typed commands and game events.

### Game Systems Engineering

- Implementing turn-based combat, inventory management, and an in-game economy.
- Building a multi-step quest progression engine.
- Generating dungeon instances at runtime.
- Coordinating gameplay rules across multiple systems while maintaining persistent player progress.

### Software Engineering & Teamwork

- Splitting a project into independent server, CLI, and GUI components.
- Working with a shared protocol contract between independently developed components.
- Writing unit tests for command handlers and documenting multiplayer integration tests.
- Making architectural trade-offs between simplicity, modularity, consistency, and maintainability.

## Links

- **Repository**: https://github.com/Arcanovax/TAP
- **Protocol reference**: RFC 42TAP, as referenced in the project documentation
- **Documentation**: See the repository README for architecture, protocol details, testing procedures, and build instructions.
