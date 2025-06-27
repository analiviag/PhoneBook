/**
 * @fileoverview Core JavaScript logic for the Phone Book Application.
 * This file defines the data structure for phone book entries and provides
 * functions for managing these entries (add, update, delete, sort, search).
 * It utilizes a hybrid approach: an Array for sorting/iteration and a Map
 * for efficient O(1) average-case lookups, updates, and deletions by ID.
 */

//Store Phone Book entries in an array
let phoneBook = [];

//Map to store Phone Book entries
let phoneBookMap = new Map();

/**
 * Represents a single entry in the phone book.
 * @typedef {Object} PhoneBookEntry
 * @property {string} id - A unique identifier for the entry.
 * @property {string} name - The name of the contact.
 * @property {string} phoneNumber - The phone number of the contact.
 * @property {string} details - Additional details for the contact (e.g., email, address, notes).
 */

//To generate a unique ID
function generateUniqueId() {
  return "_" + Math.random().toString(36).substring(2, 11);
}

/**
 * This function creates a new phone book entry and it adds it to both the 'phoneBook' array and the 'PhoneBookMap' for efficient access.
 * @param {string} name - Name of the contact.
 * @param {string} phoneNumber - The phone number of the contact.
 * @param {string} details - Any details they might add.
 * @returns
 */
function addEntry(name, phoneNumber, details) {
  if (!name || !phoneNumber) {
    console.error("Error: name and Phone Number are required to add and entry");
    return null;
  }
  const newEntry = {
    id: generateUniqueId(),
    name: name.trim(),
    phoneNumber: phoneNumber.trim(),
    details: details.trim(),
  };
  phoneBook.push(newEntry); //Adds a new entry to the array
  phoneBookMap.set(newEntry.id, newEntry); // Add to map for O(1) when looking
  console.log("Entry added:", newEntry);
  return newEntry;
}

/**
 *
 * @param {string} id - The ID to update.
 * @param {Object} updatedData - an object containing the new properties (name, phone number, details).
 * @returns {boolean} - True if the entry was found and updated, false if not.
 */

//Update entry
function updateEntry(id, updatedData) {
  const entryToUpdate = phoneBookMap.get(id);
  if (entryToUpdate) {
    Object.assign(entryToUpdate, updatedData);
    console.log("Entry updated: ", entryToUpdate);
    return true;
  } else {
    console.warn("Warning: Entry not found for update with ID", id);
    return false;
  }
}

/**
 * Deletes an entry from the Phone Book. Removes it from both the Map and the array. The map if O(1) average, the array O(n).
 * @param {string} id - The ID of the entry to delete
 * @returns {boolean} - True if the entry was found and deleted, false otherwise.
 */

function deleteEntry(id) {
  if (phoneBookMap.has(id)) {
    const initialLength = phoneBook.length; //O(1) average lookup

    //Remove from map - O(1)
    phoneBookMap.delete(id);

    //Here it becomes O(n) - it filters out the deleted ID and rebuilds phone book array
    phoneBook = phoneBook.filter((entry) => entry.id !== id);

    if (phoneBook.length < initialLength) {
      console.log("Entry deleted with ID:", id);
      return true;
    } else {
      console.warn(
        "Warning: Entry found in map but not in array for deletion with ID:",
        id
      );
      return false;
    }
  } else {
    console.warn("Warning: Entry not found for deletion with ID:", id);
    return false;
  }
}

/**
 * Sorts the entries based on a specified criterion and order.
 * Remember this localeCompare for string comparison in future.
 * @param {string} criterion - The property to sort by (name or phoneNumber).
 * @param {string} order - The sort oder (asc for ascending, desc for descending).
 * @returns {void}
 */

function sortEntries(criterion, order) {
  if (!["name", "phoneNumber"].includes(criterion)) {
    console.error(
      "Error: Invalid sort criterion. Must be 'name' or 'phoneNumber'"
    );
    return;
  }

  if (!["asc", "desc"].includes(order)) {
    console.error('Error: Invalid sort order. Must be "asc" or "desc"');
    return;
  }

  phoneBook.sort((a, b) => {
    const valA = String(a[criterion]).toLowerCase();
    const valB = String(b[criterion]).toLowerCase();

    //Use this localeCompare for string sorting
    const comparison = valA.localeCompare(valB);

    return order === "asc" ? comparison : -comparison;
  });
  console.log(`Phone book sorted by${criterion} in ${order} order.`);
}

/**
 * Filters entries based on search term. It's case-insensitive to search the name and phone number fields.
 * @param {string} searchTerm - The text to search for.
 * @returns {PhoneBookEntry[]} - An array of filtered entries that match the search term.
 */
function searchEntries(searchTerm) {
  if (typeof searchTerm !== "string") {
    console.error("Error: Search term must be a string.");
    return [];
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
  if (lowerCaseSearchTerm === "") {
    return [...phoneBook]; //Return all entries if search term is empty
  }

  const filtered = phoneBook.filter(
    (entry) =>
      String(entry.name).toLowerCase().includes(lowerCaseSearchTerm) ||
      String(entry.phoneNumber).toLowerCase().includes(lowerCaseSearchTerm)
  );
  console.log(`Search for ${searchTerm} found ${filtered.length} entries.`);
  return filtered;
}
