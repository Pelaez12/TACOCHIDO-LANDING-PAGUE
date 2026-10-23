from pathlib import Path
from html.parser import HTMLParser
import urllib.request

root = Path(__file__).resolve().parents[1]
class PosterParser(HTMLParser):
    poster = None
    def handle_starttag(self, tag, attrs):
        if tag == 'video' and not self.poster:
            self.poster = dict(attrs).get('poster')

parser = PosterParser()
parser.feed((root.parent / 'tmp/taco-brand/tiktok-embed.html').read_text(encoding='utf-8'))
if not parser.poster:
    raise RuntimeError('No TikTok poster found')
request = urllib.request.Request(parser.poster, headers={'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.tiktok.com/'})
data = urllib.request.urlopen(request, timeout=20).read()
(root / 'public/taco-tiktok-lunes.jpg').write_bytes(data)
print('TikTok cover saved:', len(data), 'bytes')
