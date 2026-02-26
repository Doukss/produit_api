export const ok = (res, data) =>
  res.status(200).json({ success: true, data });

export const created = (res, data, location) =>
  res.status(201).set("Location", location).json({ success: true, data });

export const noContent = (res) =>
  res.status(204).send();