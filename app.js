// app.js
const express = require('express');
const app = express();

// Route để cung cấp dữ liệu cho trang web
app.get('/api/data', (req, res) => {
  // Trả về một đối tượng JSON đơn giản
  res.json({ message: 'Hello from Node.js!' });
});

// Khởi động máy chủ
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//npm install express
