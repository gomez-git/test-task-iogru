import * as UsersDAO from '../dao/users.js';

export default class UsersController {
  static async getOne(req, res) {
    try {
      const user = await UsersDAO.getOne(req);

      res.json(user);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  }

  static async getAll(_req, res) {
    try {
      const users = await UsersDAO.getAll();

      res.json(users);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  }

  static async update(req, res) {
    try {
      await UsersDAO.update(req);

      res.sendStatus(204);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  }

  static async delete(req, res) {
    try {
      await UsersDAO.del(req);

      res.sendStatus(204);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  }
}
