import { FaTimes } from "react-icons/fa";

interface SignInSideComponentProps {
    toggleSignIn: () => void
}

const Login_RegistrationSideComponent: React.FC<SignInSideComponentProps> = ({ toggleSignIn }) => {
    return (

        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-end z-40'
            onClick={toggleSignIn}
        >
            <div className='w-[300px] h-full bg-white'
                onClick={(e) => e.stopPropagation()}
            >
                <div className=" h-16 flex justify-between items-center px-2">
                    <span>Sign in</span>
                    <button className="flex gap-2 items-center"
                        onClick={toggleSignIn}
                    >
                        <FaTimes /> Close
                    </button>
                </div>
                <form>
                    <div>
                        <label>Username or Email</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" />
                    </div>
                    <div>
                        <button>Login</button>
                    </div>
                </form>
                <div>
                    <span>Lost Password?</span>
                </div>
                <div>
                    <p>OR LOGIN WITH</p>
                </div>

                <div>
                    <button>Google</button>
                </div>

                <div>
                    <p>No account yet?</p>
                    <p>CREATE AN ACCOUNT</p>
                </div>

            </div>
        </div>
    )
}

export default Login_RegistrationSideComponent
