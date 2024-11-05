import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Tải biến môi trường từ file .env
dotenv.config();

// Lấy đường dẫn của tệp hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Định nghĩa cấu hình kết nối
const connectDB = async () => {
    const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql', // hoặc 'postgres', 'sqlite', v.v.
    });

    try {
        await sequelize.authenticate();
        console.log('Kết nối thành công!');
    } catch (error) {
        console.error('Không thể kết nối đến cơ sở dữ liệu:', error.message);
    }

    return sequelize;
};

export default connectDB;
