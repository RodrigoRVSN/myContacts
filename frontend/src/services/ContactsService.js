import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:5555');
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  getContactById(id) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  updateContact(id, contact) {
    return this.httpClient.put(`/contacts/${id}`, { body: contact });
  }
}

export default new ContactsService();
