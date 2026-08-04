#!/usr/bin/env python3
"""schedule/events.js 를 index.html 번들 안 이벤트 자산에 주입한다.
사용법:  python3 schedule/apply.py   (레포 루트에서)
일정 추가/수정은 schedule/events.js 만 고치고 이 스크립트를 돌리면 됨.
번들이 이벤트를 gzip 압축된 asset(uuid 고정)으로 들고 있어서 재압축해 갈아끼운다.
"""
import re, json, base64, gzip, os, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
html = (ROOT / 'index.html').read_text(encoding='utf-8')
events = (ROOT / 'schedule' / 'events.js').read_text(encoding='utf-8')

m = re.search(r'(<script[^>]*>)(\s*\{"[0-9a-f]{8}-.*?\})(\s*</script>)', html, re.S)
store = json.loads(m.group(2))

# EVENTS+SHOWS 를 담은 js 자산 찾기
uid = None
for u, v in store.items():
    if 'javascript' not in v['mime']:
        continue
    try:
        d = gzip.decompress(base64.b64decode(v['data']))
    except Exception:
        continue
    if b'EVENTS' in d and b'SHOWS' in d:
        uid = u
        break
assert uid, '이벤트 자산을 찾지 못함'

store[uid] = {
    'mime': store[uid]['mime'],
    'compressed': store[uid]['compressed'],
    'data': base64.b64encode(gzip.compress(events.encode('utf-8'))).decode(),
}
new = html[:m.start()] + m.group(1) + json.dumps(store, ensure_ascii=False) + m.group(3) + html[m.end():]
(ROOT / 'index.html').write_text(new, encoding='utf-8')
print(f'주입 완료: uuid {uid[:12]}, events {len(events)}B → index.html')
