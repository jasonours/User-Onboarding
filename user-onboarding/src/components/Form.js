import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const Form = () => {

    const initialFormState = {
        name: "",
        email: "",
        password: "",
        positions: "",
        terms: ""
    };

    const [formState, setFormState] = useState(initialFormState);

    const [errors, setErrors] = useState(initialFormState);

    const [post, setPost] = useState([]);

    const [serverError, setServerError] = useState("");    

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);    

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field."),
        email: yup.string().email("E-mail must be valid format ex: name@name.com").required("E-mail is a required field."),
        password: yup.string().required("Password is a required field").min(10, "password is too short, must be at least 10 characters"),
        positions: yup.string().required("Please choose an option."),
        terms: yup.boolean().oneOf([true], "Read our Terms and Agree to continue."),
    });

    const validateChange = e => {
        yup.reach(formSchema, e.target.name).validate(e.target.value).then(valid => {
            setErrors({ ...errors, [e.target.name]: "" });
        })
        .catch(err => {
            console.log("Error!!!", err);
            setErrors({ ...errors, [e.target.name]: err.errors[0] });
        });
    };

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            console.log("Valid?!?", valid);
            setIsButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios.post("https://reqres.in/api/users", formState)
        .then(response => {
            setPost(response.data);
            setFormState({
                name: "",
                email: "",
                password: "",
                positions: "",
                terms: ""
            });

            setServerError(null);
        })
        .catch(err => {
            setServerError("Sorry. Something went wrong.");
        }); 
    };

    const inputChange = e => {
        console.log("Input changed!", e.target.value);
        e.persist();
        const newFormData = {
        ...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <form onSubmit={formSubmit}>
            {serverError ? <p className="error">{serverError}</p> : null}
            <label htmlFor="name">
                Name
                <input id="name" type="text" name="name" onChange={inputChange} value={formState.name} />
                {errors.name.length > 0 ? (<p className="error">{errors.name}</p>) : null}
            </label>

            <label htmlFor="email">
                Email
                <input id="email" type="text" name="email" onChange={inputChange} value={formState.email} />
                {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
            </label>

            <label htmlFor="password">
                Password
                <input id="password" type="text" name="password" onChange={inputChange} value={formState.password} />
                {errors.password.length > 0 ? (<p className="error">{errors.password}</p>) : null}
            </label>

            <label htmlFor="positions">
                Position
                <select id="positions" name="positions" onChange={inputChange}>
                    <option value="">--Please choose a position--</option>
                    <option value="FrontEnd">Front End Developer</option>
                    <option value="BackEnd">Back End Developer</option>
                    <option value="FullStack">Full Stack Developer</option>
                    <option value="UxUi">UX/UI</option>
                    <option value="DataScience">Data Science</option>
                </select>
                {errors.positions.length > 0 ? (<p className="error">{errors.positions}</p>) : null}
            </label>

            <label htmlFor="terms" className="terms">
                <input id="terms" type="checkbox" name="terms" checked={formState.terms} onChange={inputChange} />
                Terms & Conditions
            </label>

            <pre>{JSON.stringify(post, null, 2)}</pre>

            <button disabled={isButtonDisabled} type="submit">Submit</button>
        </form>
    ); 
}

export default Form;