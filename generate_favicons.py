import cairosvg
from PIL import Image
import io
import os

SVG_PATH = "/home/claude/elzet-pakiet/assets/favicon.svg"
ASSETS_DIR = "/home/claude/elzet-pakiet/assets"

# Rozmiary do wygenerowania
sizes = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon-48x48.png": 48,
    "apple-touch-icon.png": 180,
    "android-chrome-192x192.png": 192,
    "android-chrome-512x512.png": 512,
}

# Generuj PNG-i w różnych rozmiarach
for filename, size in sizes.items():
    output_path = os.path.join(ASSETS_DIR, filename)
    cairosvg.svg2png(
        url=SVG_PATH,
        write_to=output_path,
        output_width=size,
        output_height=size,
    )
    print(f"Utworzono: {filename} ({size}x{size})")

# Generuj favicon.ico (multi-rozmiar: 16, 32, 48)
ico_sizes = [16, 32, 48]
images = []
for size in ico_sizes:
    png_bytes = cairosvg.svg2png(
        url=SVG_PATH,
        output_width=size,
        output_height=size,
    )
    img = Image.open(io.BytesIO(png_bytes))
    images.append(img)

ico_path = os.path.join(ASSETS_DIR, "favicon.ico")
images[0].save(
    ico_path,
    format="ICO",
    sizes=[(s, s) for s in ico_sizes],
    append_images=images[1:],
)
print(f"Utworzono: favicon.ico (multi-rozmiar: {ico_sizes})")

print("\nGotowe!")
