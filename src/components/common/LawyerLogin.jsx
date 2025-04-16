// import React from "react";
// import { useForm } from "react-hook-form";
// import { Button, Container, Card, Form } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Bounce, toast, ToastContainer } from "react-toastify";

// export const LawyerLogin = () => {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const submitHandler = async (data) => {
//     try {
//       const res = await axios.post("/lawyerLogin", data);
//       console.log(res.data);

//       if (res.status === 200) {
//         toast.success("Login Successfully", {
//           position: "top-left",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//           transition: Bounce,
//         });

//         localStorage.setItem("id", res.data.data._id);
//         localStorage.setItem("role", res.data.data.roleId.name);

//         if (res.data.data.roleId.name === "lawyer") {
//           setTimeout(() => {
//             navigate("/lawyer/lawyerDashBoard");
//           }, 2500);
//         }
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         toast.error("Your account has been blocked by the admin.", {
//           position: "top-left",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//           transition: Bounce,
//         });
//       } else {
//         toast.error("Invalid Credentials !!", {
//           position: "top-left",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//           transition: Bounce,
//         });
//       }
//     }
//   };

//   const ValidationSchema = {
//     emailValidator: {
//       required: "Email is required *",
//       pattern: {
//         value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//         message: "Invalid email format",
//       },
//     },
//     passwordValidator: {
//       required: "Password is required *",
//       minLength: {
//         value: 8,
//         message: "Minimum length is 8",
//       },
//     },
//   };

//   return (
//     <div>
//       <ToastContainer
//         position="top-left"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//         transition={Bounce}
//       />
//       <Container
//         fluid
//         className="d-flex align-items-center justify-content-center min-vh-100"
//         style={{
//           backgroundImage:
//             "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
//           backgroundSize: "cover",
//         }}
//       >
//         <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
//           <Card.Body>
//             <h2 className="text-center mb-4">Sign In</h2>
//             <Form onSubmit={handleSubmit(submitHandler)}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Your Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   {...register("email", ValidationSchema.emailValidator)}
//                 />
//                 {errors.email && (
//                   <span className="text-danger">{errors.email.message}</span>
//                 )}
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   {...register("password", ValidationSchema.passwordValidator)}
//                 />
//                 {errors.password && (
//                   <span className="text-danger">{errors.password.message}</span>
//                 )}
//               </Form.Group>

//               <div className="text-center mb-2">
//                 <Link to="/lawyerForgotPassword">Forgot password?</Link>
//               </div>

//               <Button variant="primary" className="w-100 mb-3" type="submit">
//                 Log In
//               </Button>

//               <p className="text-center">
//                 Don't have an account? <Link to="/lawyerSignup">Register here</Link>
//               </p>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };


import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const LawyerLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/lawyerLogin", data);
      console.log("Login Response:",res.data);
      console.log("RoleId:", res.data.data.roleId);

      if (res.status === 200) {
        toast.success("Login Successfully", {
          position: "top-left",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });

        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);

        if (res.data.data.roleId.name === "lawyer") {
          setTimeout(() => {
            navigate("/lawyer/lawyerDashBoard");
          }, 2500);
        }
      }
    } catch (error) {
      const status = error?.response?.status;

      if (status === 403) {
        toast.error("Your account has been blocked by the admin.", {
          position: "top-left",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      } else if (status === 404) {
        toast.error("Email not found. Please register first.", {
          position: "top-left",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      } else if (status === 401) {
        toast.error("Invalid credentials!", {
          position: "top-left",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-left",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  const ValidationSchema = {
    emailValidator: {
      required: "Email is required *",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },
    passwordValidator: {
      required: "Password is required *",
      minLength: {
        value: 8,
        message: "Minimum length is 8",
      },
    },
  };

  return (
    <div>
      <ToastContainer />
      <Container
        fluid
        className="d-flex align-items-center justify-content-center min-vh-100"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
          backgroundSize: "cover",
        }}
      >
        <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Sign In</h2>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Form.Group className="mb-3">
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email", ValidationSchema.emailValidator)}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("password", ValidationSchema.passwordValidator)}
                />
                {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </Form.Group>

              <div className="text-center mb-2">
                <Link to="/lawyerForgotPassword">Forgot password?</Link>
              </div>

              <Button variant="primary" className="w-100 mb-3" type="submit">
                Log In
              </Button>

              <p className="text-center">
                Don't have an account? <Link to="/lawyerSignup">Register here</Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
