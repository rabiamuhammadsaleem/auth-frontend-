import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Dashboard</h2>
                <div style={styles.userInfo}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>User ID:</strong> {user.id}</p>
                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' },
    card: { padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', width: '100%', maxWidth: '500px' },
    userInfo: { marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' },
    loading: { textAlign: 'center', marginTop: '2rem' }
};

export default Dashboard;