# RentSapiens

RentSapiens is a blockchain-based platform for house and apartment rentals, enabling payments in cryptocurrency. Built on the Internet Computer, it provides decentralized, transparent, and secure rental listings.

## Features

- Create and manage rental listings
- User accounts with crypto wallet integration
- Decentralized data persistence using StableBTreeMap
- Transparent and secure rental transactions

## Installation

### Prerequisites

- Node.js (version 20 or later)
- DFX (Internet Computer SDK)

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/rentsapiens.git
    cd rentsapiens
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the DFX project:
    ```bash
    dfx start
    ```

4. Deploy the canister:
    ```bash
    dfx deploy
    ```

5. Run the application:
    ```bash
    npm run dev
    ```

## API Endpoints

- **POST** `/rentals`: Create a new rental listing
- **GET** `/rentals`: Retrieve all rental listings
- **GET** `/rentals/:id`: Retrieve a specific rental listing by ID
- **PUT** `/rentals/:id`: Update a rental listing by ID
- **DELETE** `/rentals/:id`: Delete a rental listing by ID
- **POST** `/users`: Create a new user
- **GET** `/users`: Retrieve all users

## License

This project is licensed under the MIT License.
