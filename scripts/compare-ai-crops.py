"""Build native-scale comparison, overlay, and difference images for AI page sections."""
from pathlib import Path
import json
import sys
from PIL import Image, ImageChops, ImageDraw

folder = Path(sys.argv[1])
sections = sys.argv[2:]
reference = Image.open(folder / "figma-testimonials.png").convert("RGB")
reference.crop((0, 669, 1440, 841)).save(folder / "figma-recognition.png")
metrics = {}
for section in sections:
    figma = Image.open(folder / f"figma-{section}.png").convert("RGB")
    browser = Image.open(folder / f"current-{section}.png").convert("RGB")
    width = max(figma.width, browser.width)
    height = max(figma.height, browser.height)
    left = Image.new("RGB", (width, height), "white")
    right = Image.new("RGB", (width, height), "white")
    left.paste(figma)
    right.paste(browser)
    combined = Image.new("RGB", (width * 2, height + 32), "white")
    combined.paste(left, (0, 32))
    combined.paste(right, (width, 32))
    labels = ImageDraw.Draw(combined)
    labels.text((12, 8), "Decoded Figma reference", fill="black")
    labels.text((width + 12, 8), "Current browser render", fill="black")
    combined.save(folder / f"compare-{section}.png")
    Image.blend(left, right, 0.5).save(folder / f"overlay-{section}.png")
    difference = ImageChops.difference(left, right)
    difference.point(lambda value: min(255, value * 4)).save(folder / f"difference-{section}.png")
    metrics[section] = {"reference": figma.size, "browser": browser.size}
(folder / "comparison-metrics.json").write_text(json.dumps(metrics, indent=2))
print(json.dumps(metrics))
