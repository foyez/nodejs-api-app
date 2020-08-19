# Realworld API

0. SSH
1. Typescript
2. Testing/TDD/DDD
3. Docker
4. CI/CD - CircleCI
5. OpenCI/Swagger
6. Refresh Token/Google/Facebook Auth
7. Session JWT (Junior2Senior)
8. Security (Junior2Senior, CS50)
9. Performance(Caching, Load Balancing, NGINX) - PM2 (CS50)
10. MongoDB/Mongoose
11. PostgresQL
12. Redis (Junior2Senior)
13. Code Analysis (Junior2Senior)
14. AWS (Junior2Senior)
15. Functional Error Handling - https://khalilstemmler.com/articles/enterprise-typescript-nodejs/functional-error-handling/
16. Clean NodeJS Architecture - https://khalilstemmler.com/articles/enterprise-typescript-nodejs/clean-nodejs-architecture/
17. File Uploading
18. Scraping
19. Shell Script/command line
20. Socket.io
21. Deployment (Heroku, AWS, Digital Ocean, nginx)

Links:

1. https://itnext.io/production-ready-node-js-rest-apis-setup-using-typescript-postgresql-and-redis-a9525871407
2. https://github.com/talyssonoc/node-api-boilerplate

```
docker exec server-total_postgres_1 pg_dumpall -U foyez > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql

cat /media/foyez/CAD86EE7D86ED0ED/MyBackup/junior-senior-webdev/full-stack/realworld/server-total/dump_19-08-2020_14_09_31.sql | docker exec -i server-total_postgres_1 psql -U foyez
```
