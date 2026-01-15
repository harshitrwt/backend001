```
multiplayer-game-server/
│
├── cmd/
│   └── server/
│       └── main.go
│
├── internal/
│   ├── server/
│   │   ├── websocket.go
│   │   ├── handler.go
│   │   └── router.go
│   │
│   ├── game/
│   │   ├── game.go          # Game interface
│   │   ├── snake/
│   │   │   ├── snake.go
│   │   │   ├── state.go
│   │   │   └── logic.go
│   │
│   ├── room/
│   │   ├── room.go
│   │   └── manager.go
│   │
│   ├── player/
│   │   └── player.go
│   │
│   └── chat/
│       └── chat.go
│
├── pkg/
│   └── protocol/
│       └── message.go
│
├── go.mod
└── README.md
```