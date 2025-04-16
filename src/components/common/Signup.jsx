// import React from 'react';
// import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export const Signup = () => {
//     const { register, handleSubmit, formState: { errors }, watch } = useForm();

//     const navigate = useNavigate()

//     const submitHandler = async(data)=> {
//         console.log(data);

//         data.roleId = "67c2aeb24e0ed74a6a077cf5"

//         const res = await axios.post("/user",data)

//         if(res.status === 201){
//            alert("user created..")
//            navigate("/login")
//         }
//         else{
//            alert("user not added..")
//         }
       
//     };

//     const ValidationSchema = {
//         firstNameValidator: {
//             required: { value: true, message: "FirstName is required *" }
//         },
//         lastNameValidator: {
//             required: { value: true, message: "LastName is required *" }
//         },
//         emailValidator: {
//             required: { value: true, message: "Email is required *" }
//         },
//         numberValidator: {
//             required: { value: true, message: "Contact No is required *" },
//             pattern: { value: /^[6-9][0-9]{9}$/, message: "Contact is not valid" }
//         },
//         passwordValidator: {
//             required: { value: true, message: "Password is required *" },
//             minLength: { value: 8, message: "Minimum length is 8 characters" }
//         },
//         rpasswordValidator: {
//             required: { value: true, message: "Repeat password is required *" },
//             minLength: { value: 8, message: "Minimum length is 8 characters" },
//             validate: (value) => value === watch("password") || "Your password does not match"
//         },
//         checkBoxValidator: {
//             required: { value: true, message: "You must accept the terms and conditions" }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(submitHandler)}>
//             <MDBContainer fluid className='d-flex align-items-center justify-content-center min-vh-100' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//                 <div className='mask gradient-custom-3 w-100'></div>
//                 <MDBCard className='m-3 p-3 shadow-lg' style={{ maxWidth: '500px', width: '100%' }}>
//                     <MDBCardBody className='px-4'>
//                         <h2 className="text-uppercase text-center mb-4">Create an Account</h2>

//                         <MDBInput wrapperClass='mb-2' label='Your FirstName' size='lg' type='text' {...register("firstName", ValidationSchema.firstNameValidator)} />
//                         <span className="text-danger">{errors.firstName?.message}</span>

//                         <MDBInput wrapperClass='mb-2' label='Your LastName' size='lg' type='text' {...register("lastName", ValidationSchema.lastNameValidator)} />
//                         <span className="text-danger">{errors.lastName?.message}</span>

//                         <MDBInput wrapperClass='mb-2' label='Your Email' size='lg' type='email' {...register("email", ValidationSchema.emailValidator)} />
//                         <span className="text-danger">{errors.email?.message}</span>

//                         <MDBInput wrapperClass='mb-2' label='Your Contact No' size='lg' type='text' {...register("number", ValidationSchema.numberValidator)} />
//                         <span className="text-danger">{errors.number?.message}</span>

//                         <MDBInput wrapperClass='mb-2' label='Password' size='lg' type='password' {...register("password", ValidationSchema.passwordValidator)} />
//                         <span className="text-danger">{errors.password?.message}</span>

//                         <MDBInput wrapperClass='mb-2' label='Repeat your password' size='lg' type='password' {...register("rpassword", ValidationSchema.rpasswordValidator)} />
//                         <span className="text-danger">{errors.rpassword?.message}</span>

//                         <div className='d-flex flex-column justify-content-center mt-3'>
//                             <MDBCheckbox name='terms' id='terms' label='I agree to the Terms of Service' {...register("terms", { required: "You must accept the terms and conditions" })} />
//                             <span className="text-danger">{errors.terms?.message}</span>
//                         </div>

//                         <MDBBtn type="submit" className='mt-4 w-100' size='lg'>Register</MDBBtn>
//                     </MDBCardBody>
//                 </MDBCard>
//             </MDBContainer>
//         </form>
//     );
// };




import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, ToastContainer } from 'react-bootstrap';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { CustomLoader } from '../../CustomLoader';



export const Signup = () => {
    const [isLoading, setisLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        console.log(data);
        data.roleId = "67fe7022ebaab84556239a97";

        setisLoading(true)
        const res = await axios.post("/user", data);
        
        setisLoading(false)
        if (res.status === 201) {
        //    alert("user created..")
        toast.success('Signup Successfully', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
                  });
                  setTimeout(() => {
                    navigate("/Login");
                  }, 2500);
        } else {
            // alert("User not added..");
            toast.error('  Invalid Credentials !!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
        }
    };

    const ValidationSchema = {
        firstNameValidator: { required: "First Name is required *" },
        lastNameValidator: { required: "Last Name is required *" },
        emailValidator: { required: "Email is required *" },
        numberValidator: {
            required: "Contact No is required *",
            pattern: { value: /^[6-9][0-9]{9}$/, message: "Contact is not valid" }
        },
        passwordValidator: {
            required: "Password is required *",
            minLength: { value: 8, message: "Minimum length is 8 characters" }
        },
        rpasswordValidator: {
            required: "Repeat password is required *",
            minLength: { value: 8, message: "Minimum length is 8 characters" },
            validate: value => value === watch("password") || "Your password does not match"
        },
        checkBoxValidator: { required: "You must accept the terms and conditions" }
    };

    return (
        <div>
            {isLoading == true && <CustomLoader/>}
            <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
        <Container fluid className='d-flex align-items-center justify-content-center min-vh-100' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            
            <Card className='m-3 p-3 shadow-lg' style={{ maxWidth: '500px', width: '100%' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Create an Account</h2>
                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <Form.Group className='mb-2'>
                            <Form.Label>Your First Name</Form.Label>
                            <Form.Control type='text' {...register("firstName", ValidationSchema.firstNameValidator)} />
                            <span className="text-danger">{errors.firstName?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Your Last Name</Form.Label>
                            <Form.Control type='text' {...register("lastName", ValidationSchema.lastNameValidator)} />
                            <span className="text-danger">{errors.lastName?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Your Email</Form.Label>
                            <Form.Control type='email' {...register("email", ValidationSchema.emailValidator)} />
                            <span className="text-danger">{errors.email?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Your Contact No</Form.Label>
                            <Form.Control type='text' {...register("number", ValidationSchema.numberValidator)} />
                            <span className="text-danger">{errors.number?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' {...register("password", ValidationSchema.passwordValidator)} />
                            <span className="text-danger">{errors.password?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Repeat Your Password</Form.Label>
                            <Form.Control type='password' {...register("rpassword", ValidationSchema.rpasswordValidator)} />
                            <span className="text-danger">{errors.rpassword?.message}</span>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Check 
                                type='checkbox' 
                                label='I agree to the Terms of Service' 
                                {...register("terms", ValidationSchema.checkBoxValidator)} 
                            />
                            <span className="text-danger">{errors.terms?.message}</span>
                        </Form.Group>

                        <Button type="submit" className='mt-4 w-100'>Register</Button>
                    </Form>
                </Card.Body>
            </Card>
        
        </Container>
        </div>
    );
};















