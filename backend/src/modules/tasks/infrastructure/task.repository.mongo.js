const TaskRepository = require('../domain/task.repository'); // Importamos el puerto
const TaskModel = require('./task.model'); // El modelo de Mongoose
const TaskEntity = require('../domain/task.entity'); // La entidad de dominio

class MongoTaskRepository extends TaskRepository {
  // Mapeador interno para transformar el documento de Mongo a Entidad de Dominio
  _mapToEntity(mongoDoc) {
    if (!mongoDoc) return null;
    return new TaskEntity({
      id: mongoDoc._id.toString(),
      title: mongoDoc.title,
      completed: mongoDoc.completed,
      userId: mongoDoc.userId.toString(),
      createdAt: mongoDoc.createdAt,
    });
  }

  async create(data) {
    const newTask = await TaskModel.create(data);
    return this._mapToEntity(newTask);
  }

  async findAll(userId, { page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;

    const [mongoTasks, total] = await Promise.all([
      TaskModel.find({ userId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      TaskModel.countDocuments({ userId }),
    ]);

    // Convertimos cada resultado de Mongo a una entidad pura de nuestro dominio
    const tasks = mongoTasks.map((task) => this._mapToEntity(task));

    // Devolvemos solo los datos crudos. El controlador o el caso de uso calcularán "totalPages"
    return {
      tasks,
      total,
    };
  }

  async complete(taskId) {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true }
    ).lean();

    return this._mapToEntity(updatedTask);
  }

  async delete(taskId) {
    const deletedTask = await TaskModel.findByIdAndDelete(taskId).lean();
    return this._mapToEntity(deletedTask);
  }
}

module.exports = MongoTaskRepository;
