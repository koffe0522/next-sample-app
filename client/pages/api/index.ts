const handle = (req, res): any => {
  const { body } = req;
  const { name, todos } = body;
  res.json({ name, todos });
};

export default handle;
