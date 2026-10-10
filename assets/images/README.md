# Image slots (PNG only)

Replace any file below with your own artwork. Keep the filename and roughly the same aspect ratio. If a file is missing, its slot hides cleanly.

| File | Size | Where it shows |
|---|---|---|
| homepage.png | 1600x900 | Homepage hero (right side, large screens) |
| admin.png | 1400x800 | Admin login card and admin dashboard banner |
| seller.png | 1400x800 | Seller Center dashboard banner |
| auth.png | 1000x1200 | Login / register page (large screens) |
| marketplace.png | 1600x500 | Marketplace banner and homepage preview card |
| checkout.png | 1000x600 | Checkout page header |
| 404.jpg | 2048x2048 source, cropped in page | 404 page |
| empty.png | 800x600 | Every empty state (no products, orders, cart...) |
| splash.png | 1080x1920 | Full-screen loading page background |
| loader-mascot.png | 512x512 | Mascot in all loaders (transparent background) |
| loader-mascot-blink.png | 512x512 | Blink frame, same pose with closed eyes |
| collectibles.png | 800x800 | Collectibles carousel card |
| accessories.png | 800x800 | Accessories carousel card |
| figures.png | 800x800 | Figures carousel card |
| manga.png | 800x800 | Manga & Books carousel card |
| art.png | 800x800 | Art carousel card |
| apparel.png | 800x800 | Apparel carousel card |
| gaming.png | 800x800 | Gaming Products carousel card |

Regenerate all placeholders: `python3 tools/generate-placeholders.py` (needs Pillow).

The six existing category illustrations are already PNGs and are stored under the simple filenames above. Replace a file with your downloaded PNG using the same filename to update that card. `gaming.png` is a reserved slot; add its artwork when available. Until then, the shared local image fallback is shown.
