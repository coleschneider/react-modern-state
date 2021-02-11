# Local setup

## Prerequisites

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup local database

1. Run Hasura GraphQL engine & Postgres:

```sh
docker-compose up -d
```

2. Head to <http://localhost:8080/console> to open the Hasura console.
3. Execute the query from here: <https://next-auth.js.org/schemas/postgres>

## Setup local environments

### TODO: Create new Github OAuth app

### TODO: AUTH_PRIVATE_KEY

### Obtain PostgreSQL server address

Run the following command to get the id of the container you want:

```sh
docker ps
```

Run the following command to get the ip address of postgres image file that is running on docker:

```sh
docker inspect <Container-ID>
```

You’ll have to look for the **IPAddress** field, and copy that number into your postgres connection.

### TODO: SSL?

Set `DATABASE_SSL=true`?
