require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
  console.log(`Arthika Backend Server running at http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Base URL: http://localhost:${PORT}/api`);
}); 