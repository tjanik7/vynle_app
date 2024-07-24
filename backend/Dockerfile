# syntax=docker/dockerfile:1
FROM python:3

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Install dependencies
RUN pip install --upgrade pip

WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
