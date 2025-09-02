import firestore from '@react-native-firebase/firestore';


export const createNewUser = async (user) => {
    console.log("user--->>>user", user);
    
  try {
    return await firestore().collection('users').doc(user.id).set({
      mobile: user.mobile,
      id: user.id,
      createdAt: firestore.Timestamp.now(),
    } )
  } catch (error) {
    Promise.reject(error)
    console.log('Err in createNewUser :: ', error)
  }
}