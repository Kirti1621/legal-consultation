import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CustomLoader } from '../../CustomLoader';
import { Bounce, toast, ToastContainer } from 'react-toastify';


export const LawyerSignup = () => {
    const [isLoading, setisLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        
        console.log(data);
        data.roleId = "67fe7003ebaab84556239a95";
        
        console.log(data);
        console.log(data.image[0])

        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("number",data.number);
        formData.append("email",data.email);
        formData.append("password",data.password);
        formData.append("specialization",data.specialization);
        formData.append("experience",data.experience);
        formData.append("rating",data.rating);
        formData.append("roleId",data.roleId);
        formData.append("image",data.image[0]);


        
        setisLoading(true)
        const res = await axios.post("/lawyerWithFile",formData);
        setisLoading(false)
        if (res.status === 201) {
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
            setTimeout(() => {navigate("/lawyerLogin")},2500);
        } else {
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
        nameValidator: { required: "First Name is required *" },
        
        numberValidator: {
            required: "Contact No is required *",
            pattern: { value: /^[6-9][0-9]{9}$/, message: "Contact is not valid" }
        },
        emailValidator: { required: "Email is required *" },
        passwordValidator: {
            required: "Password is required *",
            minLength: { value: 8, message: "Minimum length is 8 characters" }
        },
        rpasswordValidator: {
            required: "Repeat password is required *",
            minLength: { value: 8, message: "Minimum length is 8 characters" },
            validate: value => value === watch("password") || "Your password does not match"
        },
        specializationValidator: { required: "Specialization is required *" },
        experienceValidator: { required: "Experience is required *" },
        // ratingValidator: { required: "Rating is required *" },
        imageValidator: { required: "Image is required *" },
        checkBoxValidator: { required: "You must accept the terms and conditions" }
    };

    return (
        <div>
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
            {isLoading == true && <CustomLoader/>}
        <Container fluid className='d-flex align-items-center justify-content-center min-vh-100' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Card className='m-3 p-3 shadow-lg' style={{ maxWidth: '500px', width: '100%' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Create an Account</h2>
                    <Form onSubmit={handleSubmit(submitHandler)}>
                        <Form.Group className='mb-2'>
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control type='text' {...register("name", ValidationSchema.nameValidator)} />
                            <span className="text-danger">{errors.name?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Your Contact No</Form.Label>
                            <Form.Control type='text' {...register("number", ValidationSchema.numberValidator)} />
                            <span className="text-danger">{errors.number?.message}</span>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Your Email</Form.Label>
                            <Form.Control type='email' {...register("email", ValidationSchema.emailValidator)} />
                            <span className="text-danger">{errors.email?.message}</span>
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
                          
                        {/* <Form.Group className='mb-2'>
                            <Form.Label>Specialization</Form.Label>
                            <Form.Control type='text' {...register("specialization", ValidationSchema.specializationValidator)} />
                            <span className="text-danger">{errors.specialization?.message}</span>
                        </Form.Group> */}

<Form.Group className="mb-2">
  <Form.Label>Specialization</Form.Label>
  <Form.Select {...register("specialization", ValidationSchema.specializationValidator)}>
    <option value="">Select Specialization</option>
    <option value="Civil">Civil</option>
    <option value="Criminal">Criminal</option>
    <option value="Corporate">Corporate</option>
    <option value="Family">Family</option>
    <option value="Real Estate">Real Estate</option>
    <option value="Intellectual Property">Intellectual Property</option>
    <option value="Tax">Tax</option>
    <option value="Employment">Employment</option>
  </Form.Select>
  <span className="text-danger">{errors.specialization?.message}</span>
</Form.Group>


                        <Form.Group className='mb-2'>
                            <Form.Label>Experience</Form.Label>
                            <Form.Control type='number' {...register("experience", ValidationSchema.experienceValidator)} />
                            <span className="text-danger">{errors.experience?.message}</span>
                        </Form.Group>

                        {/* <Form.Group className='mb-2'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type='decimal' {...register("rating", ValidationSchema.ratingValidator)} />
                            <span className="text-danger">{errors.rating?.message}</span>
                        </Form.Group> */}

                        <Form.Group className='mb-2'>
                            <Form.Label>Select Your Image URL</Form.Label>
                            <Form.Control type='file' {...register("image", ValidationSchema.imageValidator)} />
                            <span className="text-danger">{errors.image?.message}</span>
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