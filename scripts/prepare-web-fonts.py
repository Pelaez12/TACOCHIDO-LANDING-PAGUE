"""Prepare complete, locally hosted web fonts from the official Google Fonts repository.

PDF-embedded subsets are not suitable for arbitrary website text: Gilroy's subset
lacks a Unicode cmap and SUPER LITTLE advertises several empty letter glyphs.
"""
from io import BytesIO
import json
from pathlib import Path
import urllib.request

from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'public/fonts'
DEST.mkdir(exist_ok=True)
REQUIRED = set('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÜÑáéíóúüñ¡!¿?.,:;@+-/()')

def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'Taco-Chido-font-preparation'})
    return urllib.request.urlopen(request, timeout=30).read()

for directory, output in [('lilitaone', 'lilita-one'), ('manrope', 'manrope')]:
    files = json.loads(fetch(f'https://api.github.com/repos/google/fonts/contents/ofl/{directory}'))
    source = next(item for item in files if item['name'].endswith('.ttf'))
    font = TTFont(BytesIO(fetch(source['download_url'])))
    cmap = font.getBestCmap()
    missing = [char for char in REQUIRED if ord(char) not in cmap]
    empty = [char for char in REQUIRED if ord(char) in cmap and font['glyf'][cmap[ord(char)]].numberOfContours == 0]
    if missing or empty:
        raise RuntimeError(f'{directory}: missing={missing}, empty={empty}')
    font.flavor = 'woff2'
    font.save(DEST / f'{output}.woff2')
    (DEST / f'{output}-OFL.txt').write_bytes(fetch(next(item['download_url'] for item in files if item['name'] == 'OFL.txt')))
    print(f'{output}.woff2: Spanish alphabet, accents, punctuation and numbers verified')
