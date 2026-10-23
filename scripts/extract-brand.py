"""Extract approved logos and embedded brand typefaces from the supplied PDF."""
from pathlib import Path
import subprocess
import sys
from PIL import Image
from pypdf import PdfReader

source, output = Path(sys.argv[1]), Path(sys.argv[2])
output.mkdir(parents=True, exist_ok=True)
subprocess.run(['pdftoppm', '-f', '17', '-l', '17', '-scale-to', '4400', '-png', '-singlefile', str(source), str(output / 'brand-page')], check=True)
page = Image.open(output / 'brand-page.png').convert('RGB')
# Approved variants on page 17: red/gold on cream and cream/red on black.
for name, box, background in [
    ('red', (680, 70, 980, 240), (252, 242, 227)),
    ('cream', (125, 385, 425, 555), (20, 20, 20)),
]:
    crop = page.crop(tuple(round(v * 4) for v in box))
    bg = crop.getpixel((0, 0))
    result = Image.new('RGBA', crop.size)
    for y in range(crop.height):
        for x in range(crop.width):
            rgb = crop.getpixel((x, y))
            distance = max(abs(rgb[k] - bg[k]) for k in range(3))
            if distance < 12:
                continue
            result.putpixel((x, y), (*rgb, 255))
    bounds = result.getbbox()
    if not bounds:
        raise RuntimeError(f'Logo {name} not found')
    result.crop(bounds).save(output / f'taco-chido-logo-{name}.png', optimize=True)
(output / 'brand-page.png').unlink()

fonts = output / 'fonts'
fonts.mkdir(exist_ok=True)
reader = PdfReader(source)
seen = set()
for page in reader.pages:
    for ref in (page.get('/Resources', {}).get('/Font', {}) or {}).values():
        font = ref.get_object()
        candidates = [font]
        candidates += [r.get_object() for r in font.get('/DescendantFonts', [])]
        for item in candidates:
            descriptor = item.get('/FontDescriptor')
            if not descriptor:
                continue
            descriptor = descriptor.get_object()
            fontname = str(descriptor.get('/FontName', ''))
            if fontname in seen:
                continue
            seen.add(fontname)
            stream = descriptor.get('/FontFile2')
            if stream and ('SUPER' in fontname.upper() or 'Gilroy' in fontname):
                suffix = 'display' if 'SUPER' in fontname.upper() else ('body-bold' if 'Bold' in fontname else 'body')
                target = fonts / f'taco-{suffix}.ttf'
                if not target.exists():
                    target.write_bytes(stream.get_object().get_data())
                    print(fontname, '->', target.name)
