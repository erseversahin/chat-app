
# Redis PUB/SUB Sohbet Uygulaması

Bu proje, **Redis**, **Node.js** ve **React** kullanılarak geliştirilmiş bir gerçek zamanlı sohbet uygulamasıdır. **Redis PUB/SUB** mekanizmasını kullanarak mesajları gerçek zamanlı iletir ve online kullanıcı sayısını takip eder. Bu uygulama, Redis'in güçlü özelliklerini ve gerçek zamanlı iletişim sistemlerinde nasıl kullanılabileceğini anlamanızı sağlar.

---

## 🚀 Özellikler

- **Gerçek Zamanlı Sohbet:**
  Redis PUB/SUB kullanılarak anlık mesajlaşma desteği.
  
- **Geçmiş Mesajları Görüntüleme:**
  Redis'te saklanan mesaj geçmişini yeni kullanıcılar görebilir.

- **Online Kullanıcı Takibi:**
  Redis, anlık olarak online kullanıcı sayısını takip eder ve günceller.

- **Basit ve Kolay Kullanım:**
  Kullanıcı dostu React arayüzü.

---

## 🛠️ Teknolojiler

Bu proje aşağıdaki teknolojilerle geliştirilmiştir:

- **Backend:**
  - Node.js
  - Redis
  - WebSocket
  
- **Frontend:**
  - React.js

---

## 📦 Kurulum

### Gerekli Yazılımlar:
- **Node.js**: [Yüklemek için tıklayın](https://nodejs.org)
- **Redis**: [Redis'in resmi sitesi](https://redis.io)

### Adım 1: Depoyu Klonlayın
```bash
git clone https://github.com/erseversahin/chat-app.git
cd chat-app
```

### Adım 2: Sunucu (Backend) Kurulumu
1. `server` dizinine gidin:
   ```bash
   cd server
   ```
2. Gerekli paketleri yükleyin:
   ```bash
   npm install
   ```
3. Sunucuyu başlatın:
   ```bash
   node server.js
   ```

### Adım 3: İstemci (Frontend) Kurulumu
1. Ana dizine geri dönün ve `client` dizinine gidin:
   ```bash
   cd ../client
   ```
2. Gerekli paketleri yükleyin:
   ```bash
   npm install
   ```
3. React uygulamasını başlatın:
   ```bash
   npm start
   ```

### Adım 4: Redis'i Başlatın
Redis'i çalıştırmak için aşağıdaki komutu kullanın:
```bash
redis-server
```

---

## 🧪 Kullanım

1. **Sunucuyu (Backend) çalıştırın**: `server.js`
2. **React uygulamasını (Frontend) çalıştırın**: `npm start`
3. Tarayıcınızda `http://localhost:3000` adresine gidin.
4. Bir isim girerek sohbet odasına katılın.
5. Mesaj gönderin ve diğer kullanıcılarla gerçek zamanlı iletişim kurun.

---

## 📝 Proje Yapısı

```
chat-app/
├── client/                 # React istemcisi
│   ├── public/             # Statik dosyalar
│   ├── src/                # React kaynak kodları
│       ├── App.js          # Ana bileşen
│       └── index.js        # Giriş noktası
├── server/                 # Node.js sunucusu
│   ├── server.js           # Sunucu kodu
├── README.md               # Proje açıklaması
```

---

## 🛠️ Redis Kullanımı

- **Mesajlar:**
  - Redis, geçmiş mesajları saklamak için bir liste (list) kullanır.
  - Mesajlar `RPUSH` ile listeye eklenir.
  - Geçmiş mesajlar `LRANGE` ile alınır.

- **Online Kullanıcı Sayısı:**
  - Online kullanıcı sayısını takip etmek için Redis anahtarı kullanılır.
  - Kullanıcı bağlandığında `INCR`, ayrıldığında `DECR` komutları çalıştırılır.

- **Gerçek Zamanlı Mesajlaşma:**
  - Redis PUB/SUB özelliği, mesajları anlık olarak yayınlamak için kullanılır.

---

## 📚 Projenin Öğretici Amaçları

Bu proje, **Redis**'in aşağıdaki özelliklerini anlamanıza yardımcı olur:
1. Redis **PUB/SUB** mekanizmasını gerçek zamanlı mesajlaşma için kullanma.
2. Redis'in **list** veri türünü geçmiş mesajları saklamak için kullanma.
3. Redis'in **key-value** yapısını online kullanıcı sayısını takip etmek için kullanma.

---

## 👩‍💻 Geliştirici

- **Ersin Şahin**
  - **GitHub:** [github.com/erseversahin](https://github.com/erseversahin)
  - **Udemy Redis Eğitimi için Test Uygulaması**

---

## 📜 Lisans

Bu proje MIT lisansı ile lisanslanmıştır.