import { documentStore } from "./documentStore";
import { Result } from "./Models/Result";
const fs = require('fs')

export async function saveResult(result: Result) {
    const session = documentStore.openSession();
    await session.store(result);
    const theNewDocumentId = result.id;
    console.log(theNewDocumentId);
    await session.saveChanges()
}