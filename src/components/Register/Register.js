import { useForm } from "../../hooks/useForm"

export const Register = () => {

    const { handleChange, pass, email } = useForm({
        initialState: {
            email: '',
            pass: ''
        }
    })


    return (
        <div className="container-auth">
            <h2>Create an account</h2>

            <form >
                <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    onChange={handleChange}
                    value={email}
                />
                <input
                    name="pass"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={pass}
                />
                <div className="container-buttons">
                    <button type="submit">Sign up</button>
                </div>
            </form>
        </div>
    )
}