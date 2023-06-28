import { useForm } from '../../hooks/useForm';

export const Login = () => {

    const { handleChange, pass, email } = React.useForm({
        initialState: {
            email: '',
            pass: ''
        }
    })


    return (
        <div className="container-auth">
            <h2>Login</h2>

            <form>
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
                    <button type="submit">Log In</button>
                    <button type="button"> Google </button>
                </div>
            </form>
        </div>
    )
}