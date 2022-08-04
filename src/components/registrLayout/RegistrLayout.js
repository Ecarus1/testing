import { Form, Field } from "react-final-form";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import { signupUser, userSelector } from "./RegistrSlice";
import { useDispatch, useSelector } from "react-redux";

import { clearState } from "./RegistrSlice";

import "./RegistrLayout.scss"

const RegistrLayout = () => {
    const dispatch = useDispatch();
    const {isFetching, isSuccess, isError, errorMessage} = useSelector(userSelector)
    const navigate = useNavigate();

    const onSubmit = (data) => {
        dispatch(signupUser(data));
    }

    useEffect(() => {
        return () => {
            dispatch(clearState());
        }
    }, []);

    useEffect(() => {
        if(isSuccess){
            dispatch(clearState());
            console.log("Зашёл");
            navigate("/", { replace: true });
        }

        if(isError) {
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{
                name: '',
                surname: '',
                email: '',
                password: '',
                repeatedPassword: ''
            }}
            validate={values => {
                const errors = {};
                if (!values.name) {
                    errors.name = 'Обязательное поле';
                }
                if (!values.surname) {
                    errors.surname = 'Обязательное поле';
                }
                if (!values.email) {
                    errors.email = 'Обязательное поле';
                }
                if (!values.password) {
                    errors.password = 'Обязательное поле';
                } 
                if (!values.repeatedPassword) {
                    errors.repeatedPassword = "Обязательное поле";
                } else if (values.password !== values.repeatedPassword) {
                    errors.repeatedPassword = "Пароли не совпадают";
                }
                // console.log(errors)
                return errors;
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit} className="form">
                    <ul className="form__list">
                        <li className="form__item">
                            <h3 className="form__title">регистрация</h3>
                        </li>

                        {/* <li className="form__item form__indent">
                            <Field className="form__input" name="name" component="input" type="text" placeholder="Имя"/>
                        </li>

                        <li className="form__item form__indent">
                            <Field className="form__input" name="surname" component="input" type="text" placeholder="Фамилия"/>
                        </li>

                        <li className="form__item form__indent">
                            <Field className="form__input" name="email" component="input" type="email" placeholder="Электронная почта"/>
                        </li>

                        <li className="form__item form__indent">
                            <Field className="form__input" name="password" component="input" type="password" placeholder="Введите пароль"/>
                        </li>

                        <li className="form__item form__indent">
                            <Field className="form__input" name="repeatedPassword" component="input" type="password" placeholder="Повторите пароль"/>
                        </li> */}
                        <li className="form__item form__indent">
                            <Field name="name">
                                {({ input, meta }) => (
                                    <input 
                                        {...input} 
                                        className="form__input"
                                        style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                        type="text"
                                        placeholder="Имя"/>
                                )}
                            </Field>
                        </li>

                        <li className="form__item form__indent">
                            <Field name="surname">
                                {({ input, meta }) => (
                                    <input 
                                        {...input} 
                                        className="form__input"
                                        style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                        type="text" 
                                        placeholder="Фамилия"/>
                                )}
                            </Field>
                        </li>

                        <li className="form__item form__indent">
                            <Field name="email">
                                {({ input, meta }) => (
                                    <input 
                                        {...input} 
                                        className="form__input"
                                        style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                        type="email"
                                        placeholder="Электронная почта"/>
                                )}
                            </Field>
                        </li>

                        <li className="form__item form__indent">
                            <Field name="password">
                                {({ input, meta }) => (
                                    <input 
                                        {...input} 
                                        className="form__input"
                                        style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                        type="password"
                                        placeholder="Введите пароль"/>
                                )}
                            </Field>
                        </li>

                        <li className="form__item form__indent">
                            <Field name="repeatedPassword">
                                {({ input, meta }) => (
                                    <input 
                                        {...input}
                                        className="form__input"
                                        style={meta.error && meta.touched ? {border: "1px solid red"} : {border: "1px solid #D6DCE9"}}
                                        type="password"
                                        placeholder="Повторите пароль"/>
                                )}
                            </Field>
                        </li>

                        <li className="form__item">
                            <button className="form__submit" type="submit" disabled={submitting}>Применить и войти</button>
                        </li>

                        <li className="form__item">
                            <p>Уже зарегистрированы? <Link to="/login" className="form__link">Вход</Link></p>
                        </li>
                    </ul>
                </form>
            )
        }/>
    );
}
 
export default RegistrLayout;