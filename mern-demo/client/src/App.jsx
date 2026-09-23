import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  const [editingId, setEditingId] = useState(null); // Trạng thái lưu ID của sinh viên đang sửa
  
  //const API_URL = 'https://friendly-goggles-5vxjvg7r9vx26xv-5000.app.github.dev/api/students';
    const API_URL = 'http://localhost:5000/api/students';
    
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách sinh viên:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý Thêm mới hoặc Cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Gửi request PUT khi đang ở chế độ sửa
        const response = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setEditingId(null);
          setFormData({ studentId: '', name: '', email: '' });
          fetchStudents();
        } else {
          const errData = await response.json();
          alert(`Lỗi: ${errData.error}`);
        }
      } else {
        // Gửi request POST khi thêm mới
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setFormData({ studentId: '', name: '', email: '' });
          fetchStudents();
        } else {
          const errData = await response.json();
          alert(`Lỗi: ${errData.error}`);
        }
      }
    } catch (error) {
      console.error('Lỗi khi lưu sinh viên:', error);
    }
  };

  // Đưa dữ liệu sinh viên lên form để sửa
  const handleEditClick = (student) => {
    setEditingId(student._id);
    setFormData({ studentId: student.studentId, name: student.name, email: student.email });
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa sinh viên này không?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchStudents();
      }
    } catch (error) {
      console.error('Lỗi khi xóa sinh viên:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Ứng dụng Quản lý Sinh viên MERN</h2>

      <form onSubmit={handleSubmit} style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>{editingId ? 'Cập Nhật Sinh Viên' : 'Thêm Sinh Viên Mới'}</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="studentId"
            placeholder="Mã sinh viên (MSSV)"
            value={formData.studentId}
            onChange={handleChange}
            required
            style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', background: editingId ? 'orange' : 'green', color: 'white', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
          {editingId ? 'Lưu Thay Đổi' : 'Thêm Sinh Viên'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setFormData({ studentId: '', name: '', email: '' }); }} style={{ padding: '10px 15px', background: 'gray', color: 'white', border: 'none', cursor: 'pointer' }}>
            Hủy
          </button>
        )}
      </form>

      <h3>Danh sách sinh viên</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#ddd' }}>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <button onClick={() => handleEditClick(student)} style={{ background: 'orange', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', marginRight: '5px' }}>
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(student._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Không có dữ liệu sinh viên</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;