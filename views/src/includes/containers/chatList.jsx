import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const ChatList = ({ username, handler, rooms, contactInfo }) => {
    let defaultPhoto = 'http://localhost:3000/images/profiledf.png';

    return (
        <>
            <div style={{ padding: '0.23rem', borderBottom: '1px solid #ddd', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: '0', fontSize: '1.8rem', color: '#333', fontFamily: 'Comfortaa, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Chats</h2>
                <button style={{ border: 'none', background: 'none', cursor: 'pointer', margin: '0' }}>
                    <FontAwesomeIcon icon={faUserPlus} style={{ fontSize: '1.8rem', color: '#333' }} />
                </button>
                <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '2px', backgroundColor: 'black' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}>
                {rooms.map(room => (
                    <div key={room.id} onClick={() => handler(room.id)} style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: 'lightgray' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                                {contactInfo[room.id] && contactInfo[room.id].profilePhoto ? (
                                    <img src={`data:image/jpeg;base64,${contactInfo[room.id].profilePhoto}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <img src={defaultPhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                )}
                            </div>
                            <div style={{ fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold' }}>{room.name_client === username ? room.name_freelancer : room.name_client}</div>
                        </div>
                        {/* Aquí debajo puedes mostrar el último mensaje */}
                        {/* <div>{room.lastMessage}</div> */}
                    </div>
                ))}
            </div>
        </>
    );
}

export default ChatList;
