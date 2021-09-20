const User = require('../models/User');
const UserService = require('../services/UserService');

class AccountController {
  static async GetByIdAsync(req, res) {
    try {
      if(!req.user.sub){
        return res.status(400)
        .json({ statusCode: 400, message: "Bad request" });
      }

      const user = await UserService.GetByIdAsync(req.user.sub);
      if(!user) {
        return res.status(404)
          .json({ statusCode: 404, message: "Not Found" });
      }
      return res.status(200).json({statusCode: 200, user});
    } 
    catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  }
  
  static async RegisterAsync(req, res) 
  {
    let user = await UserService.CreateAsync(req.body);
    if (!user.isValid()) {
      return res.status(400)
        .json({ statusCode: 400, message: "Bad request", request: req.body});
    }

    try {

      let oldUser = await UserService.GetByEmailAsync(user.email);
      if (oldUser) {
        return res.status(409)
          .json({ statusCode: 409, message: `User with email: ${user.email} already exist`});
      }

      await UserService.SaveAsync(user);
      return res.status(201)
        .json({ statusCode: 200, token: user.generateJwt(false) });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  static async LoginAsync(req, res) {
    const { email, password, remember } = req.body;
    try {
      const user = await UserService.GetByEmailAsync(email);
      if (!user || !await user.validPassword(password)) {
        return res.status(400)
          .json({ statusCode: 400, message: "Invalid credentials" });
      }
      return res.status(200)
        .json({ statusCode: 200, token: user.generateJwt(remember) });
    } 
    catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = AccountController;
