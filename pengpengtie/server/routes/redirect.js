const express = require('express');
const router = express.Router();
const PengPengTie = require('../models/PengPengTie');

router.get('/:id', async (req, res) => {
  try {
    const pengPengTie = await PengPengTie.findById(req.params.id);
    if (pengPengTie) {
      return res.redirect(pengPengTie.url);
    } else {
      return res.status(404).json({ msg: 'PengPengTie not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
