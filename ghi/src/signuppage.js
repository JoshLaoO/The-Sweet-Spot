import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isBusiness, setIsBusiness] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log({ username, password, isBusiness });
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Business Account:
                    <input
                        type="checkbox"
                        checked={isBusiness}
                        onChange={(e) => setIsBusiness(e.target.checked)}
                    />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
            <Footer />
        </div>
    );
}

export default SignUpPage;
