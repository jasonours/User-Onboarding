import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Form() {
    const [post, setPost] = useState([]);

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        positions: "",
        terms: ""
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        positions: "",
        terms: ""
    });

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        email: yup
        .string()
        .email("E-mail must be valid format ex: name@name.com")
        .required(),
        terms: yup.boolean().oneOf([true], "Read our Terms and Agree to continue"),
        positions: yup.string().required("Please choose a position"),
        password: yup.string().required("Password is a required field")
    });

    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({ ...errors, [e.target.name]: "" });
        })
        .catch(err => {
            console.log("error!", err);
            setErrors({ ...errors, [e.target.name]: err.errors[0] });
        });
    };

    console.log("error state", errors);
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            console.log("valid?", valid);
            setIsButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios
        .post("https://reqres.in/api/users", formState)
        .then(response => {
            setPost(response.data);
            setFormState({
            name: "",
            email: "",
            password: "",
            positions: "",
            terms: ""
            });
        })
        .catch(err => console.log(err.response));
    };

    const inputChange = e => {
        console.log("input changed!", e.target.value);
        e.persist();
        const newFormData = {
        ...formState,
        [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <form onSubmit={formSubmit}>
        <label htmlFor="name">
            Name
            <input
            id="name"
            type="text"
            name="name"
            onChange={inputChange}
            value={formState.name}
            />
            {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
        </label>

        <label htmlFor="email">
            Email
            <input
            type="text"
            name="email"
            onChange={inputChange}
            value={formState.email}
            />
            {errors.email.length > 0 ? (
            <p className="error">{errors.email}</p>
            ) : null}
        </label>

        <label htmlFor="password">
            Password
            <input
                type="text"
                name="password"
                onChange={inputChange}
                value={formState.password}
            />
            {errors.password.length > 0 ? (
            <p className="error">{errors.password}</p>
            ) : null}
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
        </label>

        <label htmlFor="terms" className="terms">
            <input
            type="checkbox"
            name="terms"
            checked={formState.terms}
            onChange={inputChange}
            />
            Terms & Conditions
            {/* {errors.terms.length > 0 ? (
            <p className="error">{errors.terms}</p>
            ) : null} */}
        </label>

        <pre>{JSON.stringify(post, null, 2)}</pre>
        
        <button disabled={isButtonDisabled} type="submit">
            Submit
        </button>
        </form>
    );
}