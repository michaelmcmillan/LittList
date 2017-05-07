from io import BytesIO
from os.path import dirname, join
from PIL import Image, ImageFont, ImageDraw, ImageFilter

class Blur:

    def __init__(self, text):
        self.text = text
        self.size = (670, 200)
        self.font = ImageFont.truetype(join(dirname(__file__), 'times.ttf'), 16)
        self.blur = ImageFilter.GaussianBlur(radius=2)
        self.black = (0, 0, 0)
        self.white = (255, 255, 255)

    def generate_image(self):
        canvas = Image.new('RGBA', self.size, self.white)
        draw = ImageDraw.Draw(canvas)
        draw.text((0, 0), self.text, self.black, font=self.font)
        blurred = canvas.filter(self.blur)
        #blurred.save('lol.png', format='PNG')
        image_contents = BytesIO()
        canvas.save(image_contents, format='PNG')
        return image_contents
