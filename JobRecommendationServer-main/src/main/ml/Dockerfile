FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .

# Copy model files (ensure clf.pkl, tfidf.pkl, encoder.pkl are in the ml/ directory)
COPY *.pkl ./

# Create non-root user
RUN useradd -m -r mluser && chown -R mluser:mluser /app
USER mluser

EXPOSE 8000

ENV MODEL_DIR=/app

# Production server: gunicorn with 2 workers
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "--timeout", "120", "app:app"]
