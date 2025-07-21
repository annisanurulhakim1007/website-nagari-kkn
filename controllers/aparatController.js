
import db from '../config/database.js';

// @desc    Ambil semua data aparat nagari
// @route   GET /api/aparat
// @access  Public
export const getAllAparat = async (req, res) => {
  try {
    const [aparat] = await db.query('SELECT * FROM aparat_nagari ORDER BY urutan ASC, id ASC');
    res.json(aparat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Buat data aparat baru
// @route   POST /api/aparat
// @access  Private/Admin
export const createAparat = async (req, res) => {
  const { nama, jabatan, foto_url, urutan } = req.body;

  if (!nama || !jabatan) {
    return res.status(400).json({ message: 'Nama dan jabatan wajib diisi' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO aparat_nagari (nama, jabatan, foto_url, urutan) VALUES (?, ?, ?, ?)',
      [nama, jabatan, foto_url, urutan || 0]
    );
    res.status(201).json({ message: 'Data aparat berhasil ditambahkan', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update data aparat
// @route   PUT /api/aparat/:id
// @access  Private/Admin
export const updateAparat = async (req, res) => {
  const { nama, jabatan, foto_url, urutan } = req.body;
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'UPDATE aparat_nagari SET nama = ?, jabatan = ?, foto_url = ?, urutan = ? WHERE id = ?',
      [nama, jabatan, foto_url, urutan, id]
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'Data aparat berhasil diperbarui' });
    } else {
      res.status(404).json({ message: 'Data aparat tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Hapus data aparat
// @route   DELETE /api/aparat/:id
// @access  Private/Admin
export const deleteAparat = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM aparat_nagari WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.json({ message: 'Data aparat berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Data aparat tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
