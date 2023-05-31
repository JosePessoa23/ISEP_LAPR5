import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb+srv://1201007:1201007@cluster0.co9iman.mongodb.net/test",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    user:{
      name: "UserController",
      path: "../controllers/userController"
    },
    rota:{
      name: "RotaController",
      path: "../controllers/rotaController"
    },
    camiao: {
      name: "CamiaoController",
      path: "../controllers/camiaoController"
    },
    planeamento: {
      name: "PlaneamentoController",
      path: "../controllers/planeamentoController"
    }
  },

  repos: {
    rota:{
      name: "RotaRepo",
      path: "../repos/rotaRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    camiao: {
      name: "CamiaoRepo",
      path: "../repos/camiaoRepo"
    },
    planeamento: {
      name: "PlaneamentoRepo",
      path: "../repos/planeamentoRepo"
    }
  },

  services: {
    rota:{
      name: "RotaService",
      path: "../services/rotaService"
    },
    user: {
      name: "UserService",
      path: "../services/userService"
    },
    camiao: {
      name: "CamiaoService",
      path: "../services/camiaoService"
    },
    planeamento: {
      name: "PlaneamentoService",
      path: "../services/planeamentoService"
    }
  },
};
