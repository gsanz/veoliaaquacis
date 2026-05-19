class TaskEntity {
  constructor({ id, title, completed, userId, createdAt }) {
    this.id = id;
    this.title = title;
    this.completed = completed || false;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}

module.exports = TaskEntity;
