import * as sdk from "node-appwrite";

export const getEnvVariables = () => ({
  NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  DATABASE_ID: process.env.NEXT_PUBLIC_DATABASE_ID,
  PATIENT_COLLECTION_ID: process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID: process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID: process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
  BUCKET_ID: process.env.NEXT_PUBLIC_BUCKET_ID,
  ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT,
});

export const {
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_API_KEY,
  ENDPOINT,
  DATABASE_ID,
  BUCKET_ID,
  PATIENT_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
} = getEnvVariables();

// console.log('Appwrite Endpoint:', ENDPOINT);
// console.log("projectId", NEXT_PUBLIC_PROJECT_ID)
// console.log("apiKey", NEXT_PUBLIC_API_KEY)
// console.log("Database id: ", DATABASE_ID)

const client = new sdk.Client();

client
  .setEndpoint(ENDPOINT!)
  .setProject(NEXT_PUBLIC_PROJECT_ID!)
  .setKey(NEXT_PUBLIC_API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
