# Cortexx V3 asset map

Sources: `Untitled (4).fig`, `mobile.fig`

Both files contain same 48-slot image archive structure. Mobile adds/replaces several project and testimonial image hashes while retaining shared brand assets.

## Shared approved assets already present in project

| Figma hash | Existing project asset | Usage |
|---|---|---|
| `b0cb4145a717c3e25af7c303` | `public/assets/images/figma/b0cb4145a717c3e25af7c303c5bdbf3a195f349b.jpg` | Hero/product preview, desktop `JPG 1` |
| `5fc81f4932e820e1011006fa` | `public/assets/images/figma/5fc81f4932e820e1011006fa9eaa65210517a8fb.png` | Hero decorative image |
| `9ba9fb892d39bd0677fcadf1` | `public/assets/images/figma/9ba9fb892d39bd0677fcadf1169e1d6b6ad7fd8b.png` | Circuit lines |
| `53c76027947859f1638597b2` | `public/assets/images/figma/53c76027947859f1638597b259ab242aea9ff097.png` | Circuit components |
| `cb07be31077901284b216bad` | `public/assets/images/figma/cb07be31077901284b216bad893805196f094747.png` | Social proof avatar |
| `4ae134041644c361fd828d14` | `public/assets/images/figma/4ae134041644c361fd828d14a56c538158b5906d.png` | Social proof avatar |
| `253ea0a2729e2938527d49ba` | `public/assets/images/figma/253ea0a2729e2938527d49babb39dfb55ca389cd.png` | Social proof avatar |
| `ca1d4e5621343e5b01842784` | `public/assets/images/figma/ca1d4e5621343e5b0184278431c829759b981a31.png` | Social proof `+1k` avatar |
| `0107fc41fbf0a5f7bbb05203` | `public/assets/images/figma/0107fc41fbf0a5f7bbb05203baf9f9ae1554be67.png` | Case/project artwork |
| `0483e4d21d214fab7b3feec8` | `public/assets/images/figma/0483e4d21d214fab7b3feec8e2944b2fd53a73a0.png` | Case/project artwork |
| `dd9cbbd94fb6d171f0a72115` | `public/assets/images/figma/dd9cbbd94fb6d171f0a7211523d954c2a128932d.png` | Existing product artwork |
| `7af8f62724334a5fe91653d7` | `public/assets/images/figma/7af8f62724334a5fe91653d7c11017f48534a962.png` | Aurora project artwork |
| `d3c53b83709170a47e8bf41d` | `public/assets/images/figma/d3c53b83709170a47e8bf41dffb3ccbf8e389447.png` | Wstack project artwork |
| `7b43ef8e85bdd82bf7b82721` | `public/assets/images/figma/7b43ef8e85bdd82bf7b827210a5bd65b6bb8d3d6.png` | Aurora SaaS artwork |
| `4d8cad707a52e7c0b6067284` | `public/assets/images/figma/4d8cad707a52e7c0b60672844dd372c8f6960f67.png` | Voice AI artwork |
| `1e37881e785c2acf3a1882` | `public/assets/images/figma/1e37881e785c2acf3a1882b6dad6518d55813fa4.png` | Client/avatar media |
| `5c3ed82dabd37cbe156322c` | `public/assets/images/figma/5c3ed82dabd37cbe156322c8c9b2a0bc9ce4460e.png` | Client/avatar media |
| `a5347cae3133954bc0feba4` | `public/assets/images/figma/a5347cae3133954bc0feba4678f8acc6a815d29d.png` | Client/project media |

## Brand assets

- Existing `brand-vortex.svg`, `brand-velocity.svg`, `brand-synergy.svg`, `brand-spectrum.svg`, `brand-lumina.svg`, `brand-enigma.svg` remain usable only where matching approved Figma logos.
- V3 desktop recognition row uses source component logos: OYO, FedEx, Amazon, OLA, Microsoft, Walmart. These are decoded Figma vector instances, not current generic brand marquee assets. Existing page must not substitute unrelated brand names.
- Existing logo files: `logo-dark.png`, `logo-icon.png`, `logo-word-light.png`, `logo-footer-icon.png`, `logo-footer-text.png`.

## New archive-only image hashes requiring mapping before use

Desktop/mobile canvas references include hashes not currently named in existing asset directory, including:

- Hero/circuit source hashes: `9ba9fb892d39bd0677fcadf1`, `5fc81f4932e820e1011006fa`, `53c76027947859f1638597b2`.
- Desktop product/case references: `b0cb4145a717c3e25af7c303`, `d4d44da275d82105353f0b176d39808ba108c91e`, `be57fd6fce90ea0d27823f939a88aac3569ef569`.
- Mobile-specific project references: `2174c53aaa27ff532dc44f3a31e2914d25c9aff8`, `c2aaa77612028bc137bd2a53823e7f4a7f07f570`, `4a8ff121de14208d5a84814bd7a6761dc0ff4e8d`, `6953587303ab73d454bb8cb69bf96684a1726550`.

Archive extraction must copy original bytes and preserve hash-based filenames. Do not rename by guessed content.

## Extraction record

- Full canvas data decoded using local `kiwi-schema` compiled decoder and `fzstd`.
- Temporary decode outputs: `C:\Users\Cyb3r\AppData\Local\Temp\marsai\cortexx_fig\desktop` and `mobile`.
- No source `.fig` files copied into production project.
- Asset files should be promoted into `public/assets/images/figma/` only after visual mapping.
