# syntax=docker/dockerfile:1
FROM python:3.11.1

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Install dependencies
RUN pip install --upgrade pip

WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY posts /code/
COPY spotify /code/
COPY users /code/
COPY vynle /code/
COPY vynle_app /code/
COPY manage.py /code/
