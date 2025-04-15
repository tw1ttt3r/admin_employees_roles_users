import express from "express";
import helmet from "helmet";
import cors from "cors";
import { OPTIONS } from "#config/whitelist.mjs";
import { PORT, ROUTES, STATUSHTTP, EXCLUDED_ROUTES, CORS } from "#config/index.mjs";
import { Utils, Queries } from "#class/index.mjs";

const app = express();
app.use(express.json());
app.use(helmet());
if (CORS === "true") {
  app.use((req, res, next) => {
    const noCorsRoutes = [...EXCLUDED_ROUTES.split(',')]; // Rutas excluidas de CORS
  
    if (noCorsRoutes.includes(req.path)) {
      return next();
    }
  
    cors(OPTIONS)(req, res, next);
  });
}
const utils = new Utils();

app.get(ROUTES.HOME, (_, res) => {
  res.json({ response: "Microservice Roles and Permissions online!" }).send();
});

app.post(ROUTES.GETROLES, async(req, res) => {
  try {
    if (utils.validateRequestBody(req.body, ['user', 'key_validator'])) {
      res.status(STATUSHTTP.BADREQUEST).json({ msg: "Credential missings" }).send();
      return
    }

    if (!utils.validateKeyValidator(req.body['key_validator'])) {
      res.status(STATUSHTTP.BADREQUEST).json({ msg: "Validation fails!" }).send();
      return
    }

    const conn = new Queries();
    const r = await conn.getRoles({ ...req.body });
  
    res.json({ ...r }).send();
  } catch(error) {
    console.log("errro", error)
    res.status(STATUSHTTP.BADREQUEST).json({ data: 'Servicio no disponible' }).send();
  }
});

// /* WILDCARD */
app.use((_, res) => {
  res.status(STATUSHTTP.NOTIMPLEMENTED).json({ response: '...' }).send();
});

app.listen(PORT, () => {
  console.log(`Server it's alive!`);
});

// Exportar la app para que Vercel la reconozca
export default app;