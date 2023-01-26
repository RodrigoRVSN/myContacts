import { DomainContact } from '../types/IContact';
import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:5555');
  }

  async listContacts(orderBy: 'asc' | 'desc', signal: AbortSignal) {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy || 'asc'}`, { signal });

    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id: string, signal: AbortSignal) {
    const contact = await this.httpClient.get(`/contacts/${id}`, { signal });

    return ContactMapper.toDomain(contact);
  }

  createContact(contact: DomainContact) {
    const body = ContactMapper.toPersistence(contact) as unknown as BodyInit;

    return this.httpClient.post('/contacts/', { body });
  }

  updateContact(id: string, contact: DomainContact) {
    const body = ContactMapper.toPersistence(contact) as unknown as BodyInit;

    return this.httpClient.put(`/contacts/${id}`, { body })
  }

  deleteContact(id: string) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
