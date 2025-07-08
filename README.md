# Smart Home Lighting System

A modular and extensible smart home lighting control system built with **Node.js**, **Express**, and **MongoDB**. It supports multi-level control of lights — from individual bulbs to room-level control and scene automation.

## 📁 Project Structure

```
smarthome/
├── api/                          # Express API server
│   ├── controllers/              # Route handlers
│   ├── middlewares/              # Error handlers, logging, etc.
│   ├── models/                   # Mongoose models (Light, Scene)
│   ├── routes/                   # API route definitions
│   ├── app.js                    # Sets up Express app
│   ├── server.js                 # Starts the HTTP server
│   └── .env                      # Environment variables (Mongo URI, etc.)
├── src/
│   └── subsystems/
│       └── lighting/
│           ├── entities/         # Domain entities (Light)
│           ├── facades/          # LightSystem and its tests
│           └── services/         # Room manager, scene manager, light controller
├── utils/
│   └── resolvePath.js           # Helper to resolve module paths
├── package.json
└── README.md
```

---

## ✨ Features

- **Modular architecture** — subsystems cleanly separated from the API layer
- **Granular control** — Turn on/off, change brightness and color of individual lights
- **Room-level control** — Batch control of lights in specific rooms
- **Scenes** — Save and activate pre-configured lighting scenes
- **Persistence** — MongoDB ensures lights and scenes persist across restarts
- **Comprehensive tests** — LightSystem functionality is unit-tested

---

## 🛠️ Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/carlkiptoo/SmartHomeBackend.git
   cd smarthome
   ```

2. **Install dependencies**
   ```bash
   cd api
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file inside the `api/` folder:
   ```env
   MONGO_URI=mongodb://localhost:27017/smarthome
   PORT=3000
   ```

4. **Start the server**
   ```bash
   node server.js
   ```

---

## 🔌 API Endpoints

### Light Level
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/lighting/light` | Add a new light |
| DELETE | `/api/lighting/light/:lightId` | Remove a light |
| PUT | `/api/lighting/light/:lightId/on` | Turn on a light |
| PUT | `/api/lighting/light/:lightId/off` | Turn off a light |
| PUT | `/api/lighting/light/:lightId/brightness` | Set brightness |
| PUT | `/api/lighting/light/:lightId/color` | Set color |
| GET | `/api/lighting/light/:lightId` | Get status |

### Room Level
| Method | Endpoint |
|--------|----------|
| PUT | `/api/lighting/room/:room/on` |
| PUT | `/api/lighting/room/:room/off` |
| PUT | `/api/lighting/room/:room/brightness` |
| PUT | `/api/lighting/room/:room/color` |
| GET | `/api/lighting/room/:room` |

### Scenes
| Method | Endpoint |
|--------|----------|
| POST | `/api/lighting/scene` |
| PUT | `/api/lighting/scene/:sceneName/activate` |
| GET | `/api/lighting/scenes` |

### System Level
| Method | Endpoint |
|--------|----------|
| PUT | `/api/lighting/system/turnoffall` |
| PUT | `/api/lighting/system/emergencymode` |
| GET | `/api/lighting/system/lights` |

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Persistence**: MongoDB + Mongoose
- **Architecture**: Modular service-oriented
- **Testing**: Manual + Unit (testLightSystem.js)
- **Utilities**: Path resolution helper for cross-folder imports

---

## 💡 Design Philosophy

- **Separation of concerns** between API and lighting logic
- **Persistent state** using MongoDB for resilience across restarts
- **Designed for extensibility**: new subsystems (e.g. HVAC, Security) can be added easily
- **No external cloud services** — everything runs locally

---

## 👨‍💻 Author

**Kiptoo Kirui**  
Backend-focused engineer exploring smart automation systems.

- [LinkedIn](https://www.linkedin.com/in/kiptookirui)
- [Github](https://github.com/carlkiptoo)
