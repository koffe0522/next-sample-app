const handle = (req: any, res: any): void => {
  const { body } = req;
  const { name, todos } = body;
  res.json({ name, todos });
};

export default handle;
