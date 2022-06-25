import * as dao from '../dao/users.js';

const mapping = {
  GET: dao.getAll,
  POST: dao.create,
  PATCH: dao.update,
  DELETE: dao.del,
};

export default async (req, res) => {
  try {
    const result = await mapping[req.method](req);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
