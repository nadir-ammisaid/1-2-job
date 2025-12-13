# Setup Instructions

## 1. Configure Railway Database Connection

1. Copy the sample environment file:

```bash
   cp .env.railway.sample .env.railway
```

2. Get your Railway MySQL credentials:

   - Go to Railway → MySQL service → Variables tab
   - Copy the `MYSQL_PUBLIC_URL` value
   - It should look like: `mysql://root:PASSWORD@HOST:PORT/railway`

3. Fill in `.env.railway` with your actual values:
   - `DB_HOST`: Extract from the URL (e.g., `turntable.proxy.rlwy.net`)
   - `DB_PORT`: Extract from the URL (e.g., `15337`)
   - `DB_PASSWORD`: Your MySQL password
   - `JWT_SECRET`: Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

## 2. Create Admin User

1. Edit `.env.railway` and set admin credentials:

```env
   ADMIN_EMAIL=admin@yourcompany.com
   ADMIN_PASSWORD=YourSecurePassword123!
```

2. Run the admin creation script:

```bash
   npm run create-admin
```

3. **Security**: After creating the admin, delete the `ADMIN_*` variables from `.env.railway`

## 3. Never Commit Secrets

`.env.railway` is in `.gitignore` and should NEVER be committed to git!
