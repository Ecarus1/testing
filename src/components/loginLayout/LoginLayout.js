import { Form, Field } from "react-final-form";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userLoginSelector, loginUser, clearState } from "./LoginSlice";

import "../registrLayout/RegistrLayout.scss";
import "./LoginLayout.scss";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// const onSubmit = async values => {
//   await sleep(300)
//   window.alert(JSON.stringify(values, 0, 2))
// }

const LoginLayout = () => {
    const dispatch = useDispatch();
    const {isFetching, isSuccess, isError, errorMessage} = useSelector(userLoginSelector)
    const navigate = useNavigate();

    const onSubmit = (data) => {
        dispatch(loginUser(data));
    }
    
    useEffect(() => {
        return () => {
            dispatch(clearState());
        }
    }, [])

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
                email: '',
                password: ''
            }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Обязательное поле';
                }
                if (!values.password) {
                    errors.password = 'Обязательное поле';
                } 
                // console.log(errors)
                return errors;
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit} className="form">
                    <ul className="form__list">
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

                        <li className="form__item">
                            <button className="form__submit" type="submit" disabled={submitting}>Войти в систему</button>
                        </li>

                        <li className="form__item">
                            <p><Link to="/registr" className="form__link">Зарегестрироваться</Link></p>
                        </li>
                    </ul>
                </form>
            )
        }/>
    );
}
 
export default LoginLayout;