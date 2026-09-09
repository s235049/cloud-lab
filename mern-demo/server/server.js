const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//Câu 36: Import Model Student
const Student = require('../models/Student');

// CÂU 21: Khởi tạo Express Server
const app = express();

app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas (Câu 33)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Kết nối MongoDB Atlas thành công!'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// CÂU 22: Tạo API GET /api/hello ---
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Backend đang hoạt động' });
});

//Câu 36: Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
    try{
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Câu 37: Thêm sinh viên
app.post('/api/students', async (req, res) => {
    try {
        const { studentId, name, email } = req.body;
        const newStudent = new Student({ studentId, name, email });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Câu 38: Cập nhật sinh viên theo ID
app.put('/api/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedStudent) return res.status(404).json({ error: 'Không tìm thấy sinh viên' });
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Câu 39: Xóa sinh viên
app.delete('/api/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) return res.status(404).json({ error: 'Không tìm thấy sinh viên' });
        res.json({ message: 'Đã xóa sinh viên thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CÂU 21 (Tiếp theo): Lắng nghe port 5000 ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});

