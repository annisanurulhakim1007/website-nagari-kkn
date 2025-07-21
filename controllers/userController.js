import db from '../config/database.js';

// @desc    Ambil semua data user
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    // Ambil data user tanpa menyertakan password
    const [users] = await db.query('SELECT id, nama, email, role, created_at FROM users ORDER BY created_at DESC');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Hapus data user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  
  // Mencegah admin menghapus akunnya sendiri
  if (req.user.id === parseInt(id)) {
      return res.status(400).json({ message: 'Admin tidak dapat menghapus akun sendiri' });
  }

  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.json({ message: 'User berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'User tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
