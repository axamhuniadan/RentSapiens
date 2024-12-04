import { v4 as uuidv4 } from "uuid";
import { StableBTreeMap } from "azle";
import express from "express";
import { time } from "azle";

/**
 * rentalStorage - Key-value datastructure to store rental listings.
 * {@link StableBTreeMap} ensures data durability and efficient storage.
 */

/**
 * Class representing a rental listing.
 */
class Rental {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  owner: string; // Owner ID
  createdAt: Date;
  updatedAt: Date | null;
}

/**
 * Class representing a user.
 */
class User {
  id: string;
  name: string;
  walletAddress: string; // Crypto wallet address
  createdAt: Date;
}

const rentalStorage = StableBTreeMap<string, Rental>(0);
const userStorage = StableBTreeMap<string, User>(1);

const app = express();
app.use(express.json());

// Create a new rental listing
app.post("/rentals", (req, res) => {
  const rental: Rental = {
    id: uuidv4(),
    createdAt: getCurrentDate(),
    updatedAt: null,
    ...req.body,
  };
  rentalStorage.insert(rental.id, rental);
  res.json(rental);
});

// Retrieve all rental listings
app.get("/rentals", (req, res) => {
  res.json(rentalStorage.values());
});

// Retrieve a specific rental listing
app.get("/rentals/:id", (req, res) => {
  const rentalId = req.params.id;
  const rental = rentalStorage.get(rentalId);
  if (!rental) {
    res.status(404).send(`Rental with id=${rentalId} not found`);
  } else {
    res.json(rental);
  }
});

// Update a rental listing
app.put("/rentals/:id", (req, res) => {
  const rentalId = req.params.id;
  const rental = rentalStorage.get(rentalId);
  if (!rental) {
    res.status(404).send(`Rental with id=${rentalId} not found`);
  } else {
    const updatedRental = {
      ...rental,
      ...req.body,
      updatedAt: getCurrentDate(),
    };
    rentalStorage.insert(rental.id, updatedRental);
    res.json(updatedRental);
  }
});

// Delete a rental listing
app.delete("/rentals/:id", (req, res) => {
  const rentalId = req.params.id;
  const deletedRental = rentalStorage.remove(rentalId);
  if (!deletedRental) {
    res.status(404).send(`Rental with id=${rentalId} not found`);
  } else {
    res.json(deletedRental);
  }
});

// Create a new user
app.post("/users", (req, res) => {
  const user: User = {
    id: uuidv4(),
    createdAt: getCurrentDate(),
    ...req.body,
  };
  userStorage.insert(user.id, user);
  res.json(user);
});

// Retrieve all users
app.get("/users", (req, res) => {
  res.json(userStorage.values());
});

// Get the current date
function getCurrentDate() {
  const timestamp = new Number(time());
  return new Date(timestamp.valueOf() / 1000_000);
}

app.listen();
