const User = require('./auth.model');

class MongoAuthRepository {
  async findByEmail(email) {
    return User.findOne({ email });
  }

  async create(userData) {
    return User.create(userData);
  }
}

module.exports = MongoAuthRepository;
