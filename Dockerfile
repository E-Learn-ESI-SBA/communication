FROM python:2.7

RUN apt-get update && apt-get install -y socat
RUN pip install cassandra-migrate

# Set the working directory in the container
RUN mkdir /app

WORKDIR /app

# Update pip to the latest version
RUN pip install --upgrade pip


COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

# Install the cassandra-migrate library

WORKDIR /app/migrations

EXPOSE 1337

# CMD tail -f /dev/null
ENTRYPOINT [ "../entrypoint.sh" ]