# Phone Book Management System

This document outlines the usage and features of a simple phone book management system. It demonstrates how to add, update, sort, search, and delete entries within the phone book.

---

## Demonstration of Usage

The following examples illustrate the core functionalities of the phone book system.

### Initialization and Adding Entries

The system starts by initializing the phone book. You can then add new entries with a name, phone number, and optional details.

```javascript
console.log("--- Initializing Phone Book ---");

// Add example entries
const alice = addEntry(
  "Alice Smith",
  "123-456-7890",
  "Friend, works at XYZ Inc."
);
const bob = addEntry(
  "Bob Johnson",
  "987-654-3210",
  "Colleague, emergency contact."
);
addEntry("Charlie Brown", "555-123-4567", "Family member.");
addEntry("David Lee", "111-222-3333", "Client, call after 2 PM.");
addEntry("Eve Adams", "444-555-6666", "Gym buddy.");
console.log("Current Phone Book Array:", phoneBook);
console.log("Current Phone Book Map Size:", phoneBookMap.size);
```

### Updating an Entry

Entries can be updated using their unique ID. This operation boasts an average time complexity of O(1) for lookup.

```javascript
if (alice) {
  updateEntry(alice.id, {
    phoneNumber: "111-222-7777",
    details: "Friend, updated number.",
  });
}
console.log("Phone Book Array after update (check Alice):", phoneBook);
```

### Sorting Entries

You can sort the phone book entries by different fields (e.g., name, phoneNumber) in either ascending (asc) or descending (desc) order.

```javascript
console.log("\n--- Sorting by Name (Ascending) ---");
sortEntries("name", "asc");
console.log("Sorted Phone Book Array:", phoneBook);

console.log("\n--- Sorting by Phone Number (Descending) ---");
sortEntries("phoneNumber", "desc");
console.log("Sorted Phone Book Array:", phoneBook);
```

### Searching for Entries

The system allows you to search for entries based on keywords, which can match names or phone numbers.

```javascript
console.log('\n--- Searching for "Smith" ---');
const searchResults1 = searchEntries("Smith");
console.log('Search Results ("Smith"):', searchResults1);

console.log('\n--- Searching for "555" (in phone numbers) ---');
const searchResults2 = searchEntries("555");
console.log('Search Results ("555"):', searchResults2);
```

### Deleting an Entry

Entries can be deleted using their unique ID. This operation has an average time complexity of O(1) for lookup, but filtering the underlying array takes O(N).

```javascript
if (bob) {
  deleteEntry(bob.id);
}
console.log("\n--- Phone Book after deleting Bob Johnson ---");
console.log("Final Phone Book Array:", phoneBook);
console.log("Final Phone Book Map Size:", phoneBookMap.size);

// Try to delete a non-existent entry
console.log("\n--- Attempting to delete non-existent entry ---");
deleteEntry("nonExistentId123");
console.log("Phone Book Array after failed deletion attempt:", phoneBook);
```
