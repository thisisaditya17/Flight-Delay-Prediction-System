# Use the official Python image as the base image
FROM python:3.12

# Set the working directory
WORKDIR /app

# Copy the requirements file first (better caching)
COPY requirements.txt .

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Create a non-root user for security
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Expose the port (Render uses PORT environment variable)
EXPOSE $PORT

# Use Gunicorn instead of Flask development server
CMD gunicorn --bind 0.0.0.0:$PORT --workers 2 app:app
