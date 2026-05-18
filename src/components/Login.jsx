// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
        
//         const result = await login(email, password);
        
//         if (result.success) {
//             navigate('/dashboard');
//         } else {
//             setError(result.message);
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.card}>
//                 <h2>Login</h2>
//                 {error && <div style={styles.error}>{error}</div>}
//                 <form onSubmit={handleSubmit}>
//                     <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
//                     <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
//                     <button type="submit" style={styles.button}>Login</button>
//                 </form>
//                 <p>Don't have an account? <Link to="/signup">Signup</Link></p>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' },
//     card: { padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', width: '100%', maxWidth: '400px' },
//     input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' },
//     button: { width: '100%', padding: '0.75rem', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
//     error: { backgroundColor: '#ffebee', color: '#c62828', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem' }
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        const result = await login(email, password);
        
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Login</h2>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={styles.input} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={styles.input} 
                    />
                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p style={styles.footer}>
                    Don't have an account? <Link to="/signup">Signup</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' },
    card: { padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', width: '100%', maxWidth: '400px', backgroundColor: 'white' },
    input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' },
    button: { width: '100%', padding: '0.75rem', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
    error: { backgroundColor: '#ffebee', color: '#c62828', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem' },
    footer: { marginTop: '1rem', textAlign: 'center' }
};

export default Login;