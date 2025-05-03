// export const PORT = isNaN(process.env.PORT) ? 3000 : parseInt(process.env.PORT);

import { z } from "zod"; //npm i zod

const portSchema = z.coerce.number().min(1).max(65000).defaul(3000);

const PORT = portSchema.parse(process.env.PORT);