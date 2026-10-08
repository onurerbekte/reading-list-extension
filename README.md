# Oku Sonra / Read Later
**Kurgusal demo proje / Fictional demo project.**

## Türkçe
Manifest V3 Chrome eklentisi: aktif sekmeyi yerel listeye kaydetme, arama, okunma durumu ve silme. Türkçe/İngilizce arayüz. Yalnızca `activeTab` ve `storage` izinleri; dış sunucu yok.

Kurulum: Chrome'da `chrome://extensions` aç → Geliştirici modu → Paketlenmemiş öğe yükle → bu klasörü seç → eklentiyi araç çubuğuna sabitle. Bir HTTP/HTTPS sayfasında simgeye basıp “Bu sekmeyi kaydet” seç. Dil düğmesi arayüzü değiştirir. Testler: Node.js 24 ile bu klasörde `npm test`; kurulum/paket indirme gerekmez.

Liste 200 kayıtla sınırlı; fragment bağlantıları aynı sayfa sayılır. Eklenti kaldırılınca yerel kayıtlar kaybolabilir. Hassas URL'leri kaydetme. 

## English
A bilingual Manifest V3 extension for saving the active tab, searching, marking read/unread, and deleting entries. Only `activeTab` and `storage` permissions; no remote server.

Open `chrome://extensions`, enable Developer mode, choose Load unpacked, select this folder, and pin the extension. Open an HTTP/HTTPS page, click the extension, then Save this tab. Run logic tests with Node.js 24 using `npm test`; no package installation is needed.

Maximum 200 entries; fragments are normalized. Removing the extension may remove stored data. Avoid saving sensitive URLs.

## Doğrulama notu / Verification note

Mola sitesi Opera'da elle açılıp görsel olarak kontrol edildi. Telegram botu gerçek botla elle test edildi. Chrome eklentisi Opera'da elle test edildi. Docker projesi Docker Desktop ile çalıştırıldı; GET /health, GET /products ve POST /products elle denendi. OpenAI projesi anahtarsız demo modunda. Mobil cihaz testi yapıldı; yalnızca Android/iOS/web paketleri derlendi.

The Mola website was manually opened and visually checked in Opera. The Telegram bot was manually tested with a real bot. The Chrome extension was manually tested in Opera. The Docker project was run with Docker Desktop; GET /health, GET /products and POST /products were manually exercised. The OpenAI project is in key-free demo mode. Mobile device testing was performed; only Android/iOS/web bundles were built.
