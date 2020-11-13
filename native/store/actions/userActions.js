import axios from 'axios';
import { CREATE_USER, LOGIN_USER, UPDATE_USER } from '../constans/constans';
import { BACK_URL } from '../../env';

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Acción para crear usuario (Desde Register Screen) *
 * * * * * * * * * * * * * * * * * * * * * * * * * * */
export function createUser(userData,onSuccess) {

	const dataUser = {
		username: userData.username,
		email: userData.email,
		password: userData.password,
	};
	return (dispatch) => {

		axios
			.post(`${BACK_URL}/api/users/create`, dataUser)
			.then((res) => {
				console.log(res.data);
				dispatch({
					type: CREATE_USER,
					users: res.data || {},
					createUserSuccess: true,
				});
				onSuccess();
			})
			.catch((error) => {
				console.log('Api call error');
				alert(error.message);
			});
	};
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Acción para completar registro usuario(Desde AltaUser Screen) *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export function completeUserRegister(userData) {
	console.log(userData);
	const { name, lastname, dni, phone, address, dob, _id } = userData;
	const dataUser = { name, lastname, dni, phone, address, dob, _id };

	return (dispatch) => {
		axios
			.put(`${BACK_URL}/api/users/update`, dataUser)
			.then((res) => {
				console.log('User updated', res.data);
				dispatch({ type: UPDATE_USER, users: res.data });
			})
			.catch((error) => {
				console.log('Error when updating user');
				alert(error.message);
			});
	};
}

// export const loginUser = (email, password) => (dispatch) => {

//       axios
//         .post(`${url}/api/auth/login`, {
//           email: email,
//           password: password,
//         })
//         .then((res) => {
//           const token = res.data.token;
//           console.log(res)
//           if (token) {
//             localStorage.setItem("token", token);
//             dispatch({
//               type: LOGIN_USER,
//             });

//             /* dispatch(getCurrentUser(token));
//             Swal.fire({
//               position: "center",
//               icon: "success",
//               title: `¡Bienvenido!`,
//               showConfirmButton: false,
//               timer: 2000,
//             }); */
//           }

//         })
//         .catch((error) => {
//           console.log(error)
//           });

// };

/*  export const getCurrentUser = (token) => async (dispatch) => {
  //Headers con Token
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  await axios.get(`${url}/users/me/`, config).then((res) => {
    dispatch({
      type: actionTypes.CURRENT_USER,
      user: res.data,
    });
  });
}; */
