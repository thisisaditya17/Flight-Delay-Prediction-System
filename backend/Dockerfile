# Use the official Python image as the base image
FROM python:3.12

# Set the working directory to the project root
WORKDIR /app

# Copy the entire project
COPY . .

# Install requirements from backend directory
RUN pip install --no-cache-dir -r backend/requirements.txt

# Create a non-root user for security
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Expose the port
EXPOSE $PORT

# Change to backend directory and run gunicorn
CMD cd backend && gunicorn --bind 0.0.0.0:$PORT --workers 2 app:app
