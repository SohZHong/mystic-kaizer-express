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

## What This Project Does

Mystic Kaizer Express acts as a webhook receiver and middleware layer that integrates blockchain smart contract events (via **MultiBaas**) with a **PostgreSQL** database powered by **Supabase**.

It listens for various smart contract events, processes the payloads, and updates or inserts records into corresponding Supabase tables. Here’s a high-level overview:

### Event Handling

#### EventCreated

When a new event is created on-chain, the app:

- Extracts metadata like organizer, description, location, etc.
- Saves it to the events table in Supabase.
- Sets an alias for the event contract on MultiBaas.
- Links the contract in MultiBaas for future event tracking.

#### BattleStarted

Updates the gameLobbies table in Supabase with a battle ID once a match begins.

#### Attack

Logs each attack instance to the battleLogs table, tying it back to the specific battle via Supabase queries.

#### EventStarted

Marks an event as started and updates the reward count in the events table.

#### ParticipantRegistered

Triggers a Supabase stored procedure (`increment_registered_participants`) to update participant counts atomically.

### Technologies in Use

| Stack      | Role                                                         |
| ---------- | ------------------------------------------------------------ |
| Express.js | API server and webhook listener                              |
| TypeScript | Strong typing and safer backend logic                        |
| Supabase   | Database and RPC layer (PostgreSQL with realtime API access) |
| MultiBaas  | Blockchain event gateway and contract abstraction layer      |
| Docker     | Containerization for local and remote deployment             |
