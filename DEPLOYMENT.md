# Deployment Guide — AI Job Recommendation System

This guide outlines the steps to deploy the application in production. The easiest and most recommended method is **Docker Compose**, which runs the React frontend, Spring Boot backend, Flask ML service, and MySQL database automatically on a single server.

---

## Option 1: Docker Compose Deployment (Recommended)
Suitable for Cloud Virtual Private Servers (VPS) like **AWS EC2, DigitalOcean, Linode, Google Compute Engine, or Azure VM**.

### Prerequisites
1. Install Docker and Docker Compose on the host server:
   ```bash
   # Example for Ubuntu/Debian:
   sudo apt-get update
   sudo apt-get install -y docker.io docker-compose
   ```
2. Copy your project files to the server (e.g., using Git clone or SCP).
3. Ensure the ML model pickle files (`clf.pkl`, `tfidf.pkl`, `encoder.pkl`) are placed in `JobRecommendationServer-main/src/main/ml/`.

### Deployment Steps
1. Navigate to the project root directory:
   ```bash
   cd Job-Recommendation-System
   ```
2. Create/edit the environment variables `.env` file in the root directory to set production credentials:
   ```env
   MYSQL_ROOT_PASSWORD=your_secure_db_password
   MYSQL_DATABASE=job_recommendation
   CORS_ORIGINS=http://yourdomain.com
   VITE_API_URL=http://yourdomain.com
   VITE_RAPIDAPI_KEY=your_rapidapi_key
   ```
3. Run Docker Compose in detached mode:
   ```bash
   docker-compose up --build -d
   ```
4. Verifying execution:
   - Check container status: `docker-compose ps`
   - Access the website on port `80` at `http://your_server_ip` or `http://yourdomain.com`.

---

## Option 2: Platform-as-a-Service (PaaS) Deployment
If you want to host components separately on specialized managed cloud platforms.

### 1. Database (MySQL)
Host on managed database platforms like **Aiven, Clever Cloud, or AWS RDS**:
1. Provision a MySQL 8 instance.
2. Record the host URL, username, password, and database name.
3. Import schema or let Spring Boot hibernate initialize tables on start.

### 2. ML Service (Python Flask)
Host on **Render, Heroku, or railway.app**:
1. Connect your GitHub repository.
2. Set the build root directory to: `JobRecommendationServer-main/src/main/ml`.
3. Set the start command:
   ```bash
   gunicorn --bind 0.0.0.0:$PORT app:app
   ```
4. Make sure your virtual environment includes `scikit-learn`, `numpy`, `flask`, and `gunicorn`.
5. Upload model pickle files (if they are large, you can host them on AWS S3 or include them in Git LFS).

### 3. Backend API (Spring Boot)
Host on **Render, Heroku, or AWS Elastic Beanstalk**:
1. Package the project locally:
   ```bash
   cd JobRecommendationServer-main
   ./mvnw clean package -DskipTests
   ```
   This generates a runnable `.jar` file under `target/`.
2. Configure the following environment variables on your PaaS dashboard:
   - `SERVER_PORT` = `8080`
   - `DB_URL` = `jdbc:mysql://<your-db-host>:3306/job_recommendation`
   - `DB_USERNAME` = `your_db_user`
   - `DB_PASSWORD` = `your_db_password`
   - `ML_API_URL` = `https://<your-flask-app-url>/predict`
   - `CORS_ORIGINS` = `https://<your-frontend-domain>`
   - `JWT_SECRET` = `your_custom_secure_secret_key_at_least_32_characters`

### 4. Frontend (React Vite SPA)
Host on **Vercel, Netlify, or AWS S3**:
1. Connect your frontend directory to Vercel or Netlify.
2. Configure environment variables in the build dashboard:
   - `VITE_API_URL` = `https://<your-spring-boot-backend-url>`
   - `VITE_RAPIDAPI_KEY` = `your_rapidapi_key`
3. Set the build parameters:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Important SPA Routing Configuration**:
   - For **Vercel**, create a `vercel.json` file in the `frontend` folder to handle routing:
     ```json
     {
       "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
     }
     ```
   - For **Netlify**, create a `_redirects` file in `public/`:
     ```text
     /*   /index.html   200
     ```

---

## Option 3: Manual Deployment on Virtual Private Server (VPS)
If you want to run services without Docker on a single VM.

### 1. Python ML Service Setup
```bash
sudo apt-get install -y python3-pip python3-venv
cd JobRecommendationServer-main/src/main/ml
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt gunicorn
# Run in background via systemd service or PM2:
gunicorn --bind 127.0.0.1:8000 app:app --daemon
```

### 2. Spring Boot Setup
Install Java 21 JRE and execute:
```bash
sudo apt-get install -y openjdk-21-jre-headless
cd JobRecommendationServer-main
# Build
./mvnw clean package -DskipTests
# Run jar in background:
nohup java -jar target/JobRecomendationserver-0.0.1-SNAPSHOT.jar > backend.log 2>&1 &
```

### 3. Frontend Production Build & Nginx
1. Compile assets:
   ```bash
   cd frontend
   npm run build
   ```
2. Copy `dist/` directory to Nginx's HTML root:
   ```bash
   sudo cp -r dist/* /var/www/html/
   ```
3. Configure `/etc/nginx/sites-available/default` to serve the SPA and reverse proxy API calls:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location /api/ {
           proxy_pass http://127.0.0.1:8080;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```
4. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```
