import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                <Link to="/" style={styles.logo}>Auth App</Link>
                <div style={styles.links}>
                    {user ? (
                        <>
                            <span style={styles.user}>Welcome, {user.name}</span>
                            <button onClick={handleLogout} style={styles.button}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.link}>Login</Link>
                            <Link to="/signup" style={styles.link}>Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: { backgroundColor: '#333', padding: '1rem' },
    container: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' },
    logo: { color: 'white', fontSize: '1.5rem', textDecoration: 'none' },
    links: { display: 'flex', gap: '1rem', alignItems: 'center' },
    link: { color: 'white', textDecoration: 'none' },
    user: { color: '#4CAF50', marginRight: '1rem' },
    button: { padding: '0.5rem 1rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Navbar;