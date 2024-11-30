#!/bin/sh

# รอให้ฐานข้อมูลพร้อมใช้งาน
echo "Waiting for postgres..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# รัน migrations
npm run sequelize:migrate

# แสดงรายการ tables ที่ถูกสร้าง
echo "\nDatabase Tables:"
PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -U $DATABASE_USER -d $DATABASE_NAME -c "\dt"

# แสดงโครงสร้างของแต่ละ table
echo "\nTables Structure:"
PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -U $DATABASE_USER -d $DATABASE_NAME -c "\d+ Users"
PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -U $DATABASE_USER -d $DATABASE_NAME -c "\d+ Tasks"

# แสดงข้อมูลตัวอย่างจากแต่ละ table
echo "\nSample Data from Users Table:"
PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -U $DATABASE_USER -d $DATABASE_NAME -c "SELECT * FROM \"Users\" LIMIT 10;"

echo "\nSample Data from Tasks Table:"
PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -U $DATABASE_USER -d $DATABASE_NAME -c "SELECT * FROM \"Tasks\" LIMIT 10;"

# รัน seeds
npm run sequelize:seed

# เริ่มต้นแอปพลิเคชัน
npm run start:prod