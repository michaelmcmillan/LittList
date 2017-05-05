from os.path import dirname, join
from io import BytesIO
from PIL import Image, ImageFont, ImageDraw, ImageFilter

class Blur:


    def __init__(self, text):
        self.text = text
        self.size = (500, 800)
        self.font = ImageFont.truetype(join(dirname(__file__), 'times.ttf'), 16)
        self.blur = ImageFilter.GaussianBlur(radius=2)
        self.black = (0, 0, 0)
        self.white = (255, 255, 255)

    def generate_image(self):
        image = Image.new('RGBA', self.size, self.white)
        draw = ImageDraw.Draw(image)
        draw.text((0, 0), self.text, self.black, font=self.font)
        image = image.filter(self.blur)
        raw_image = BytesIO()
        image.save(raw_image, format='PNG')
        return raw_image
