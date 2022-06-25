export default (_req, res) => {
  try {
    res.json('It\'s working!');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
