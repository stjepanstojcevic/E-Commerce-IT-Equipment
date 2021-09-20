const mongoose = require('mongoose');
const User = mongoose.model('User');

class UserService {
  static async CreateAsync({ firstname, lastname, email, password }) {
    let user = new User({ 
      firstname,
      lastname,
      email: email.toLowerCase(),
      role: "user"
    });
    
    await user.setGravatar(email);
    await user.setPassword(password);
    return user;
  }

  static async GetByIdAsync(id) {
    return await User.findById(id).select('-password');
  }

  static async GetByEmailAsync(email) {
    return await User.findOne({ email });
  }

  static async SaveAsync(user) {
    user.save();
  }
}

module.exports = UserService;
