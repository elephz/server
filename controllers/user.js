exports.create = async (req, res) => {
  try {
    res.send('User created');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
}

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    res.send('User updated');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
}

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    res.send('User deleted');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
} 

exports.list = async (req, res) => {
  try {
    res.send('User list');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
}