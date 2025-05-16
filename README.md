# Express Webhook for [Mystic Kaizer](https://github.com/SohZHong/blockchain-asg)

Mystic Kaizer Express is a TypeScript-based Node.js application built with the Express framework. It is designed to be containerized using Docker and orchestrated with Docker Compose. This repo is meant to act as the webhook server for the Mystic Kaizer application.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SohZHong/mystic-kaizer-express.git
cd mystic-kaizer-express
```

### 2. Install the dependencies

```bash
yarn
```

### 3. Environment Configuration

Create a `.env` file in the root directory of the project by copying the provided `.env.sample` file:

```bash
cp .env.sample .env
```

Modify the `.env` file to suit your environment.

### 4. Running the Application

#### Using Docker

To build and run the application using Docker:

```bash
docker build -t mystic-kaizer-express .
docker run -p 3001:3001 --env-file .env mystic-kaizer-express
```

This will start the application and make it accessible at http://localhost:3001. ￼

#### Using Docker Compose

To build and run the application using Docker Compose:

```bash
docker-compose up --build
```

This command will build the Docker image and start the container as defined in the `docker-compose.yaml` file.

### 5. Deployment to Remote Docker Host

To deploy the application to a remote Docker host:

#### 1. Build the Docker Image Locally

```bash
docker build -t mystic-kaizer-express .
```

#### 2. Tag the Image for the Remote Repository

```bash
docker tag mystic-kaizer-express your-remote-repo/mystic-kaizer-express
```

#### 3. Push the Image to the Remote Repository

```bash
docker push your-remote-repo/mystic-kaizer-express
```

#### 4. SSH into the Remote Server and Pull the Image

```bash
ssh user@remote-server
docker pull your-remote-repo/mystic-kaizer-express
```

#### 5. Run the Docker Container on the Remote Server

```bash
docker run -d -p 3001:3001 --env-file .env your-remote-repo/mystic-kaizer-express
```

Ensure that the `.env` file on the remote server is properly configured with the necessary environment variables.
