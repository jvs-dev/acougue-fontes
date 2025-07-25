import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(`${import.meta.env.VITE_APPWRITE_PROJECT_ID}`);

export const account = new Account(client);
export { ID } from 'appwrite';
