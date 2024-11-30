echo "Waiting for postgres..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

npm run sequelize:migrate

npm run sequelize:seed

npm run start:prod