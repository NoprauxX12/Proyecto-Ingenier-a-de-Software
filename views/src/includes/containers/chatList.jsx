import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const ChatList = ({handler, estimates})=>{
    let photo = 'http://localhost:3000/images/profiledf.png';

    return(<>
        <div style={{ padding: '0.23rem', borderBottom: '1px solid #ddd', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: '0', fontSize: '1.8rem', color: '#333', fontFamily: 'Comfortaa, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Cotizaciones</h2>
                        <button style={{ border: 'none', background: 'none', cursor: 'pointer', margin:'0' }}>
                            <FontAwesomeIcon icon={faUserPlus} style={{ fontSize: '1.8rem', color: '#333' }} />
                        </button>
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '2px', backgroundColor: 'black' }}></div>
                </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}>
                {estimates.map(estimate => (
                <div key={estimate.id} onClick={() => handler(estimate.id)} style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: 'lightgray' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                            <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    <div style={{ fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold' }}>{estimate.name}</div>
                </div>
                <p style={{marginLeft: "1em", marginTop: "0.3em"}}>{estimate.description.slice(0,28)}...</p>
            </div>
            ))}
        </div>
    </>);
}

export default ChatList;
