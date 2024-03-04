# Setup
1. Create a GitHub OAuth app with the callback set to http://localhost:3000/login/github/callback and create an .env file with DATABASE_URL
```yaml
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
# used by prisma
DATABASE_URL=""
# Prisma CLI automatically loads the DATABASE_URL environment variables from the .env file,so .env will support both Prisma and Next.js
```

2. <code>npx prisma generate</code> to generate prisma client
3. <code>npx prisma db push</code> to migrate database

# todo
1. blog add highlight remark and tag
2. read later highlight remark and tag
3. markdown
4. json pretty