FROM python:3.10

WORKDIR /app

# Copy and install dependencies first to optimize Docker layer caching
COPY server/requirements.txt /app/

RUN apt-get update \
    && apt-get install -y build-essential libssl-dev libffi-dev python3-dev \
    && apt-get clean

RUN pip install --upgrade pip \
    && pip install -r requirements.txt  # Ensure the path is correct

# Copy the rest of the app
COPY server/ /app/

CMD ["python", "app.py"]
