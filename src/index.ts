import app from './app';
import { db } from './utils/firebase/firebaseAdmin';
const port = process.env.PORT || 3000;

// (async function addUser() {
//   try {
//     const user = {
//       uid: 'fefFf4jfo24ttfj490f4',
//       email: 'scottify20@gmail.com',
//       firstName: 'Scott Ivan',
//       lastName: 'Fulguirinas',
//       username: 'scottify20',
//       role: 'admin',
//     };

//     await db.collection('users').doc(user.uid).set(user);
//   } catch (err) {
//     console.log(err);
//   }
// })();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
