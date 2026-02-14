exports.createAd = async (req, res) => {
  try {
    const { title, link, mediaType } = req.body;

    const ad = await Ad.create({
      title,
      link,
      mediaType,
      media: req.file ? req.file.filename : ""
    });

    res.json(ad);

  } catch (err) {
    res.status(500).json(err.message);
  }
};
