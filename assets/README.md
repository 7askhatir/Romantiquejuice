# Images

All existing files in `img/` are used as-is — none were renamed, deleted or overwritten.

## What each image is used for

| File | Role |
| --- | --- |
| `photo-01-sm.jpg` | Real shop photograph — hero + gallery (contains the shop signage and Essaouira street address) |
| `photo-09-sm.jpg` | Branded shop signage — gallery |
| `photo-10.jpg` / `photo-10-sm.jpg` | Branded shop imagery — available to the owner |
| `photo-04-sm.jpg` | Juice poster / menu-style reference — gallery |
| `photo-05-sm.jpg`, `photo-06-sm.jpg` | Fresh fruit / drink imagery — gallery and menu thumbnails |
| `photo-11.jpg` | Fruit / menu board — gallery |
| `photo-02-sm.jpg`, `photo-03-sm.jpg`, `photo-07-sm.jpg`, `photo-08-sm.jpg` | Available to the owner |

Fruit and drink categories not covered by the shop photography are filled with
remote editorial photos. Replace any of them with your own files in this folder.

## How to change an image

Open `../data/site.js`:

- `shopPhoto` — the establishment photo used in the hero.
- `images` — named image library used by the menu and gallery.
- `gallery` — the gallery order, captions and grid size (`"wide"` / `"tall"`).

Copy a new image into this folder, point the relevant value at it
(e.g. `assets/img/my-photo.jpg`), save and refresh. No build step required.
Leave the original files untouched.
