const tasksDb = require('../models/tasksDb');


exports.createTask = (ctx) => {
  tasksDb.createTask(ctx);
  ctx.status= 200;
}

exports.getMyAskTasks = async (ctx) => {
  ctx.body = await tasksDb.getMyAskTasks(ctx);
  ctx.status = 200;
}

exports.getMyDoTasks = async (ctx) => {
  ctx.body = await tasksDb.getMyDoTasks(ctx);
  ctx.status = 200;
}

exports.update = (ctx) => {
  tasksDb.updateTask(ctx);
  ctx.status = 200;
}

exports.delete = (ctx) => {
  tasksDb.deleteTask(ctx);
  ctx.status = 200;
}

exports.searchTasks = async (ctx) => {
  const tasks = await tasksDb.searchTasks(ctx);
  ctx.body = await JSON.stringify(tasks);
  ctx.status = 200;
}
