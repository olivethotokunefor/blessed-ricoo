import { initializeApp, type FirebaseOptions } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productsCollection = collection(db, 'products');
const reviewsCollection = collection(db, 'reviews');

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  featured: boolean;
  createdAt: unknown;
  updatedAt: unknown;
};

function normalizeProduct(docSnap: QueryDocumentSnapshot<DocumentData>): Product {
  const data = docSnap.data();

  return {
    id: docSnap.id,
    name: String(data.name ?? ''),
    description: String(data.description ?? ''),
    category: String(data.category ?? ''),
    price: Number(data.price ?? 0),
    image: String(data.image ?? ''),
    featured: Boolean(data.featured ?? false),
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const docRef = await addDoc(productsCollection, {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    ...product,
    createdAt: null,
    updatedAt: null,
  };
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  await updateDoc(doc(productsCollection, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(productsCollection, id));
}

export async function getProductById(id: string): Promise<Product | null> {
  const snapshot = await getDoc(doc(productsCollection, id));

  if (!snapshot.exists()) {
    return null;
  }

  return normalizeProduct(snapshot as QueryDocumentSnapshot<DocumentData>);
}

export async function getProducts(): Promise<Product[]> {
  const productsQuery = query(productsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(productsQuery);

  return snapshot.docs.map(normalizeProduct);
}

// Review types and functions
export type Review = {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  createdAt: unknown;
};

function normalizeReview(docSnap: QueryDocumentSnapshot<DocumentData>): Review {
  const data = docSnap.data();

  return {
    id: docSnap.id,
    name: String(data.name ?? ''),
    email: String(data.email ?? ''),
    rating: Number(data.rating ?? 5),
    message: String(data.message ?? ''),
    createdAt: data.createdAt ?? null,
  };
}

export async function createReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  const docRef = await addDoc(reviewsCollection, {
    ...review,
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    ...review,
    createdAt: null,
  };
}

export async function getReviews(): Promise<Review[]> {
  const reviewsQuery = query(reviewsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(reviewsQuery);

  return snapshot.docs.map(normalizeReview);
}
