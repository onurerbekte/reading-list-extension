# Oku Sonra / Read Later
**Kurgusal demo proje / Fictional demo project.**

## Türkçe
Manifest V3 Chrome eklentisi: aktif sekmeyi yerel listeye kaydetme, arama, okunma durumu ve silme. Türkçe/İngilizce arayüz. Yalnızca `activeTab` ve `storage` izinleri; dış sunucu yok.

Kurulum: Chrome'da `chrome://extensions` aç → Geliştirici modu → Paketlenmemiş öğe yükle → bu klasörü seç → eklentiyi araç çubuğuna sabitle. Bir HTTP/HTTPS sayfasında simgeye basıp “Bu sekmeyi kaydet” seç. Dil düğmesi arayüzü değiştirir. Testler: Node.js 24 ile bu klasörde `npm test`; kurulum/paket indirme gerekmez.

Liste 200 kayıtla sınırlı; fragment bağlantıları aynı sayfa sayılır. Eklenti kaldırılınca yerel kayıtlar kaybolabilir. Hassas URL'leri kaydetme. Chrome eklentisi Opera'da (Chromium tabanlı) paketlenmemiş uzantı olarak yüklenip denendi. Bu doğrulama kullanıcının 8 Ekim 2026 tarihli bildirimiyle kaydedildi. Ayrıca dört mantık/manifest testi geçti.

## English
A bilingual Manifest V3 extension for saving the active tab, searching, marking read/unread, and deleting entries. Only `activeTab` and `storage` permissions; no remote server.

Open `chrome://extensions`, enable Developer mode, choose Load unpacked, select this folder, and pin the extension. Open an HTTP/HTTPS page, click the extension, then Save this tab. Run logic tests with Node.js 24 using `npm test`; no package installation is needed.

Maximum 200 entries; fragments are normalized. Removing the extension may remove stored data. Avoid saving sensitive URLs. The Chrome extension was loaded and tested in Opera (Chromium-based) as an unpacked extension. This verification was recorded from the author’s report dated 8 October 2026. Four logic/manifest tests also passed.
