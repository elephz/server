const bcrypt = require('bcrypt');

module.exports = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}