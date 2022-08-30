import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Todo } from "../models/Todos";

export const getAllTodo = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll();
    res.status(200);
    return res.json({ todos });
  } catch (error) {
    res.status(501);
    res.json({ error, message: "Error no banco de dados" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    if (req.body.title) {
      if (req.body.done) {
        let newTodo = await Todo.create({
          title: req.body.title,
          done: req.body.done,
        });
        res.status(201);
        return res.json({ newTodo });
      }
      let newTodo = await Todo.create({ title: req.body.title });
      res.status(201);
      return res.json({ newTodo });
    } else {
      return res.json({ error: "Dados não enviados" });
    }
  } catch (error) {
    res.status(501);
    res.json({ error, message: "Error no banco de dados" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    let todoUpdate = await Todo.findByPk(id);
    if (todoUpdate) {
      if (req.body.title) {
        todoUpdate.title = req.body.title;
      }

      if (req.body.done) {
        switch (req.body.done.toLowerCase()) {
          case "true":
          case "1":
            todoUpdate.done = true;
            break;
          case "false":
          case "0":
            todoUpdate.done = false;
        }
      }
      await todoUpdate.save();
      res.json({
        item: todoUpdate,
      });
    } else {
      res.json({ error: "item nao encontrado" });
    }
  } catch (error) {
    res.status(501);
    res.json({ error, message: "Error no banco de dados" });
  }
};
export const del = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      await Todo.destroy({ where: { id } });
      res.json();
    }
  } catch (error) {
    res.status(501);
    res.json({ error, message: "Error no banco de dados" });
  }
};
