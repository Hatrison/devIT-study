const log = async (req, res) => {
  return res.status(201).json({ message: 'log' });
};

module.exports = log;
