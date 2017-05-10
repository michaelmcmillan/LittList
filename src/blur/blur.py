from io import BytesIO
from textwrap import fill
from base64 import b64encode
from os.path import dirname, join
from PIL import Image, ImageFont, ImageDraw, ImageFilter

class Blur:

    def __init__(self, text):
        self.text = text
        self.font = ImageFont.truetype(join(dirname(__file__), 'times.ttf'), 16)
        self.blur = ImageFilter.GaussianBlur(radius=2)

        self.width = 670
        self.black = (0, 0, 0)
        self.white = (255, 255, 255)
        self.chars = 100
        self.start = (10, 10)

    def calculate_height(self, line_broken_text):
        linebreaks = line_broken_text.count('\n')
        width, height = self.font.getsize(line_broken_text)
        return height + 20 * (max(1, linebreaks) + 1)

    def render(self):
        line_broken_text = fill(self.text, width=self.chars)
        height = self.calculate_height(line_broken_text)
        canvas = Image.new('RGBA', (self.width, height), self.white)
        draw = ImageDraw.Draw(canvas)
        draw.text(self.start, line_broken_text, self.black, font=self.font)
        blurred = canvas.filter(self.blur)
        image_contents = BytesIO()
        #blurred.show()
        blurred.save(image_contents, format='PNG')
        image_contents.seek(0)
        return image_contents

    def render_base64(self):
        image = self.render().getvalue()
        return b64encode(image).decode('utf-8')
