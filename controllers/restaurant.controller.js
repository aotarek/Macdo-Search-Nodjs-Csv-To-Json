const search = function(req, res) {
  let data = [];
  query = req.body.country.toLowerCase();
  if (req.body === undefined || req.body.country === undefined) {
    return res
      .status(422)
      .json({ message: 'country fields are required', data: data });
  }
  if (typeof req.body.country !== 'string') {
    return res
      .status(422)
      .json({ message: 'country most be String', data: data });
  }

  data = listMacdonadl.filter(item =>
    item.country.toLowerCase().startsWith(query)
  );
  return res
    .status(200)
    .json({ message: 'success', data: data, total: data.length });
};
module.exports.search = search;
