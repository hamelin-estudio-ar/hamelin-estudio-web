// Completar con la configuración de tu app web (Firebase Console > Configuración del proyecto).
// Estos valores son públicos por diseño; la seguridad se define en firestore.rules.
export const firebaseConfig = {
  apiKey: "REEMPLAZAR",
  authDomain: "REEMPLAZAR.firebaseapp.com",
  projectId: "REEMPLAZAR",
  storageBucket: "REEMPLAZAR.appspot.com",
  messagingSenderId: "REEMPLAZAR",
  appId: "REEMPLAZAR"
};

export const isConfigured = firebaseConfig.projectId !== "REEMPLAZAR";
