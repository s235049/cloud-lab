import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  
  // Địa chỉ Backend API của bạn (hoặc thay bằng URL Codespaces backend nếu chạy cloud phân tán)
  const API_URL = '/api/students';

  // Lấy danh sách sinh viên từ Backend (GET /api/students)
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

  // Xử lý thay đổi form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gửi dữ liệu tạo sinh viên mới (POST /api/students)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ studentId: '', name: '', email: '' });
        fetchStudents(); // Tải lại danh sách
      } else {
        const errData = await response.json();
        alert(`Lỗi: ${errData.error}`);
      }
    } catch (error) {
      console.error('Lỗi khi thêm sinh viên:', error);
    }
  };

  // Xử lý xóa sinh viên (DELETE /api/students/:id)
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

      {/* Form thêm sinh viên */}
      <form onSubmit={handleSubmit} style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Thêm Sinh Viên Mới</h3>
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
        <button type="submit" style={{ padding: '10px 15px', background: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
          Thêm Sinh Viên
        </button>
      </form>

      {/* Danh sách sinh viên */}
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