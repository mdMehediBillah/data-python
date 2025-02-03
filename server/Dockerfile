# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY server/requirement.txt /app/

RUN apt-get update \
    && apt-get install -y build-essential libssl-dev libffi-dev python3-dev \
    && apt-get clean

RUN pip install --upgrade pip \
    && pip install -r requirement.txt  # Ensure the correct path

# Copy the rest of the application
COPY server/ /app/

# Expose the port the Flask app runs on
EXPOSE 5000

# Command to run the application using Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
