const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
	const contacts = await fs.readFile(contactsPath);
	return JSON.parse(contacts);
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const contact = contacts.find(contact => contact.id === contactId);
	return contact || null;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const contactIndex = contacts.findIndex(contact => contact.id === contactId);
	if (contactIndex === -1) {
		return null;
	}
	const [deletedContact] = contacts.splice(contactIndex, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return deletedContact;
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = {
		name,
		email,
		phone,
		id: uuidv4(),
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
