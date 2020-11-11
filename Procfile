release: chmod u+x config_db.py && python3 config_db.py
web: set NODE_ENV=production && npm install && npx sequelize db:migrate:all && node index.js
