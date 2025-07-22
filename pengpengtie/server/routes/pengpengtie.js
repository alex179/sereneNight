const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PengPengTie = require('../models/PengPengTie');

// Create
router.post('/', auth, async (req, res) => {
  const { name, url } = req.body;
  try {
    const newPengPengTie = new PengPengTie({
      userId: req.user.id,
      name,
      url,
    });
    const pengPengTie = await newPengPengTie.save();
    res.json(pengPengTie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Read
router.get('/', auth, async (req, res) => {
  try {
    const pengPengTies = await PengPengTie.find({ userId: req.user.id });
    res.json(pengPengTies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update
router.put('/:id', auth, async (req, res) => {
  const { name, url } = req.body;
  try {
    let pengPengTie = await PengPengTie.findById(req.params.id);
    if (!pengPengTie) return res.status(404).json({ msg: 'PengPengTie not found' });
    if (pengPengTie.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    pengPengTie = await PengPengTie.findByIdAndUpdate(
      req.params.id,
      { $set: { name, url } },
      { new: true }
    );
    res.json(pengPengTie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    let pengPengTie = await PengPengTie.findById(req.params.id);
    if (!pengPengTie) return res.status(404).json({ msg: 'PengPengTie not found' });
    if (pengPengTie.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await PengPengTie.findByIdAndRemove(req.params.id);
    res.json({ msg: 'PengPengTie removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
