import { initializeApp } from "firebase/app";
import { 
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChDGk6SCLlM1ySBzjkARAQrbNt146Fk_0",
  authDomain: "tech-store-fbecd.firebaseapp.com",
  projectId: "tech-store-fbecd",
  storageBucket: "tech-store-fbecd.firebasestorage.app",
  messagingSenderId: "815134973510",
  appId: "1:815134973510:web:5e312855b950b35bf7b447"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Nombre de la colección en Firebase
const COLECCION_PRODUCTOS = "items";

// ========== FUNCIONES EXISTENTES ==========

export const obtenerProductos = async () => {
  try {
    const productosCol = collection(db, COLECCION_PRODUCTOS);
    const productosSnapshot = await getDocs(productosCol);
    const productosList = productosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productosList;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};

export const obtenerProductosPorCategoria = async (categoria) => {
  try {
    const productosCol = collection(db, COLECCION_PRODUCTOS);
    const q = query(productosCol, where("categoria", "==", categoria));
    const productosSnapshot = await getDocs(q);
    const productosList = productosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productosList;
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    return [];
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    const productoDoc = doc(db, COLECCION_PRODUCTOS, id);
    const productoSnapshot = await getDoc(productoDoc);
    
    if (productoSnapshot.exists()) {
      return { id: productoSnapshot.id, ...productoSnapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    return null;
  }
};

export const crearOrden = async (ordenData) => {
  try {
    const ordenesCol = collection(db, "ordenes");
    const docRef = await addDoc(ordenesCol, {
      ...ordenData,
      fecha: new Date().toISOString(),
      estado: "pendiente"
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al crear orden:", error);
    throw error;
  }
};

// ========== NUEVA FUNCIÓN: Obtener productos por IDs (para destacados) ==========

export const obtenerProductosPorIds = async (ids) => {
  try {
    const productosCol = collection(db, COLECCION_PRODUCTOS);
    const productosSnapshot = await getDocs(productosCol);
    
    const todosLosProductos = productosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Filtrar solo los productos cuyos IDs están en la lista
    const productosFiltrados = todosLosProductos.filter(producto => 
      ids.includes(producto.id)
    );
    
    return productosFiltrados;
  } catch (error) {
    console.error("Error al obtener productos destacados:", error);
    return [];
  }
};