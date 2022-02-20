require('dotenv').config();
import { DocumentStore, IAuthOptions } from 'ravendb';
import * as fs from "fs";
import { settings } from './settings';

const authOptions: IAuthOptions = {
    certificate: fs.readFileSync("certs/bot-cert.pfx"),
    type: "pfx",
    password: process.env.CERT_PASSWORD
};

const store = new DocumentStore(settings.RavenUrl, settings.DbName, authOptions);
store.initialize();
export { store as documentStore };