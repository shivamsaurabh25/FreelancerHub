import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  limit
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

const sanitize = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

// Authentication functions
export const signUp = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const { password: _, confirmPassword: __, ...sanitizedData } = userData;

    // Update profile with display name
    await updateProfile(user, {
      displayName: userData.name
    });

    const cleanedData = sanitize(sanitizedData);

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid,
      createdAt: new Date().toISOString(),
      ...cleanedData,
    });

    return user;
  } catch (error) {
    console.error("SignUp Error:", error.message);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

// Firestore functions
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async (uid, data) => {
  try {
    await updateDoc(doc(db, 'users', uid), data);
  } catch (error) {
    throw error;
  }
};

export const getFreelancers = async () => {
  try {
    const q = query(collection(db, 'users'), where('userType', '==', 'freelancer'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const docRef = await addDoc(collection(db, 'jobs'), {
      ...jobData,
      createdAt: serverTimestamp(),
      status: 'open',
      applicationsCount: 0,
      applications: []
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getJobs = async (filters = {}) => {
  try {
    let q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));

    // Apply filters
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.skills?.length) {
      q = query(q, where('skills', 'array-contains-any', filters.skills));
    }
    if (filters.clientId) {
      q = query(q, where('clientId', '==', filters.clientId));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date()
    }));
  } catch (error) {
    throw error;
  }
};

// Enhanced Job Functions
export const getJobById = async (jobId) => {
  try {
    const docRef = await getDoc(doc(db, 'jobs', jobId));
    if (!docRef.exists()) {
      return {
        id: jobDoc.id,
        ...jobDoc.data(),
        createdAt: jobDoc.data().createdAt?.toDate?.() || new Date()
      };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateJob = async (jobId, updates) => {
  try {
    await updateDoc(doc(db, 'jobs', jobId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  try {
    await deleteDoc(doc(db, 'jobs', jobId));
  } catch (error) {
    throw error;
  }
};

// Job Application Functions
export const applyToJob = async (jobId, freelancerId, applicationData) => {
  try {
    const applicationRef = await addDoc(collection(db, 'applications'), {
      jobId,
      freelancerId,
      ...applicationData,
      status: 'pending',
      createdAt: serverTimestamp()
    });

    // Update job with application
    await updateDoc(doc(db, 'jobs', jobId), {
      applications: arrayUnion(applicationRef.id),
      applicationsCount: arrayUnion(freelancerId).length
    });

    return applicationRef.id;
  } catch (error) {
    throw error;
  }
};

export const getJobApplications = async (jobId) => {
  try {
    const q = query(
      collection(db, 'applications'),
      where('jobId', '==', jobId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date()
    }));
  } catch (error) {
    throw error;
  }
};

export const getUserApplications = async (freelancerId) => {
  try {
    const q = query(
      collection(db, 'applications'),
      where('freelancerId', '==', freelancerId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date()
    }));
  } catch (error) {
    throw error;
  }
};

// Messaging Functions
export const createConversation = async (participants, jobId = null) => {
  try {
    const data = {
      participants,
      jobId,
      createdAt: serverTimestamp(),
      lastMessage: null,
      lastMessageTime: serverTimestamp(),
      unreadCount: {}
    };

    // Initialize unread count for each participant
    participants.forEach(participantId => {
      data.unreadCount[participantId] = 0;
    });

    const docRef = await addDoc(collection(db, 'conversations'), data);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getOrCreateConversation = async (user1Id, user2Id, jobId = null) => {
  try {
    // Check if conversation already exists
    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', user1Id)
    );

    const snapshot = await getDocs(q);
    const existing = snapshot.docs.find(doc => {
      const data = doc.data();
      return data.participants.includes(user2Id) && (jobId ? data.jobId === jobId : !data.jobId);
    });

    return existing ? existing.id : await createConversation([user1Id, user2Id], jobId);

  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (conversationId, senderId, content, type = 'text') => {
  try {
    const messageData = {
      conversationId,
      senderId,
      content,
      type,
      createdAt: serverTimestamp(),
      read: false
    };

    const messageRef = await addDoc(collection(db, 'messages'), messageData);

    // Update conversation with last message
    const conversationRef = doc(db, 'conversations', conversationId);
    const conversationSnap = await getDoc(conversationRef);

    if (conversationSnap.exists()) {
      const convo = conversationSnap.data();
      const updates = {
        lastMessage: content,
        lastMessageTime: serverTimestamp(),
        unreadCount: { ...convo.unreadCount }
      };

      // Increment unread count for other participants
      convo.participants.forEach(id => {
        if (id !== senderId) {
          updates.unreadCount[id] = (updates.unreadCount[id] || 0) + 1;
        }
      });

      await updateDoc(conversationRef, updates);
    }

    return messageRef.id;
  } catch (error) {
    throw error;
  }
};

export const getConversations = (userId, callback) => {
  const q = query(
    collection(db, 'conversations'),
    where('participants', 'array-contains', userId),
    orderBy('lastMessageTime', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const conversations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      lastMessageTime: doc.data().lastMessageTime?.toDate?.() || new Date()
    }));
    callback(conversations);
  });
};

export const getMessages = (conversationId, callback, limitCount = 50) => {
  const q = query(
    collection(db, 'messages'),
    where('conversationId', '==', conversationId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date()
    })); // Reverse to show oldest first
    callback(messages.reverse());
  });
};

export const markMessagesAsRead = async (conversationId, userId) => {
  try {
    // Reset unread count for user
    const conversationRef = doc(db, 'conversations', conversationId);
    await updateDoc(conversationRef, {
      [`unreadCount.${userId}`]: 0
    });

    // Mark messages as read
    const messagesQuery = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      where('senderId', '!=', userId),
      where('read', '==', false)
    );

    const snapshot = await getDocs(messagesQuery);
    const batch = [];

    snapshot.docs.forEach(doc => {
      batch.push(updateDoc(doc.ref, { read: true }));
    });

    await Promise.all(batch);
  } catch (error) {
    throw error;
  }
};

// Real-time listeners
export const subscribeToJobs = (callback, filters = {}) => {
  let q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));

  if (filters.status) {
    q = query(q, where('status', '==', filters.status));
  }

  return onSnapshot(q, (snapshot) => {
    const jobs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date()
    }));
    callback(jobs);
  });
};

export const subscribeToUserApplications = (freelancerId, callback) => {
  const q = query(
    collection(db, 'applications'),
    where('freelancerId', '==', freelancerId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const applications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date()
    }));
    callback(applications);
  });
};

// --- Pagination: Get Jobs with Pagination Support ---
export const getJobsPaginated = async (lastDoc = null, pageSize = 10, filters = {}) => {
  try {
    let q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'), limit(pageSize));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    // Apply filters
    if (filters.status) q = query(q, where('status', '==', filters.status));
    if (filters.skills?.length) q = query(q, where('skills', 'array-contains-any', filters.skills));
    if (filters.clientId) q = query(q, where('clientId', '==', filters.clientId));

    const snapshot = await getDocs(q);
    const jobs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date()
    }));

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    return { jobs, lastVisible };
  } catch (error) {
    throw error;
  }
};

// --- Bookmarking Functions ---
export const bookmarkJob = async (uid, jobId) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      bookmarkedJobs: arrayUnion(jobId)
    });
  } catch (error) {
    throw error;
  }
};

export const removeBookmark = async (uid, jobId) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return;

    const bookmarks = userSnap.data().bookmarkedJobs || [];
    const updated = bookmarks.filter(id => id !== jobId);

    await updateDoc(userRef, { bookmarkedJobs: updated });
  } catch (error) {
    throw error;
  }
};

export const getBookmarkedJobs = async (uid) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', uid));
    if (!userSnap.exists()) return [];

    const jobIds = userSnap.data().bookmarkedJobs || [];
    if (jobIds.length === 0) return [];

    const jobPromises = jobIds.map(jobId => getDoc(doc(db, 'jobs', jobId)));
    const jobDocs = await Promise.all(jobPromises);
    return jobDocs
      .filter(doc => doc.exists())
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }));
  } catch (error) {
    throw error;
  }
};

// --- Get Jobs with Application Status for a Freelancer ---
export const getJobsWithApplicationStatus = async (uid) => {
  try {
    const jobsSnapshot = await getDocs(query(collection(db, 'jobs'), orderBy('createdAt', 'desc')));
    const jobs = jobsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date()
    }));

    const appsSnapshot = await getDocs(query(
      collection(db, 'applications'),
      where('freelancerId', '==', uid)
    ));
    const appliedJobIds = appsSnapshot.docs.map(doc => doc.data().jobId);

    return jobs.map(job => ({
      ...job,
      hasApplied: appliedJobIds.includes(job.id)
    }));
  } catch (error) {
    throw error;
  }
};


export { auth, onAuthStateChanged };