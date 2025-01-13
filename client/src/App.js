import React, { useState, useEffect } from 'react';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // WebSocket bağlantısı oluştur
    const socket = new WebSocket('ws://localhost:4000');

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'online_users') {
        setOnlineUsers(Number(message.data)); // Online kullanıcı sayısını güncelle
      } else if (message.type === 'message') {
        // Mesajların tekrarlanmasını önlemek için kontrol et
        setMessages((prev) => {
          if (!prev.includes(message.data)) {
            return [...prev, message.data];
          }
          return prev;
        });
      }
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && input.trim() !== '' && isNameSet) {
      ws.send(JSON.stringify({ type: 'message', data: `${name}: ${input}` }));
      setInput('');
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      setIsNameSet(true);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Redis PUB/SUB Sohbet</h1>

      {!isNameSet ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <h2>İsminizi Giriniz</h2>
          <form onSubmit={handleNameSubmit} style={{ textAlign: 'center' }}>
            <input
              type="text"
              placeholder="İsim"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: '10px', width: '250px', marginBottom: '10px' }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Sohbete Katıl
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Hoş Geldiniz, {name}!</h2>
          <p style={{ fontWeight: 'bold' }}>Online Kullanıcılar: {onlineUsers}</p>
          <div
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              height: '300px',
              overflowY: 'scroll',
              marginBottom: '10px',
            }}
          >
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} style={{ marginBottom: '5px' }}>
                  {msg}
                </div>
              ))
            ) : (
              <p style={{ color: '#888' }}>Henüz bir mesaj yok...</p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Mesajınızı yazın"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Gönder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;