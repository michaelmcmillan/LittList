from io import BytesIO
from textwrap import fill
from base64 import b64encode
from os.path import dirname, join
from PIL import Image, ImageFont, ImageDraw, ImageFilter

class Blur:

    def __init__(self, text):
        self.original_text = text
        self.text = fill(text, width=100)

        self.font = ImageFont.truetype(join(dirname(__file__), 'times.ttf'), 16)
        self.blur = ImageFilter.GaussianBlur(radius=2.5)

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
        height = self.calculate_height(self.text)
        canvas = Image.new('RGBA', (self.width, height), self.white)
        draw = ImageDraw.Draw(canvas)

        lines = self.text.split('\n')
        clear_start_index = self.original_text.find('<i>') + 3
        clear_stop_index = self.original_text.find('</i>') - 1

        current_line_index = 0
        current_char_index = -1
        current_char_on_line_index = -1

        for char in self.text:
            current_char_index += 1
            current_char_on_line_index += 1

            if char == '\n':
                current_line_index += 1
                current_char_on_line_index = -1

            leading_characters_on_line = lines[current_line_index][:current_char_on_line_index]
            leading_width, leading_height = self.font.getsize(leading_characters_on_line)

            x, y = self.start
            x += leading_width
            y += current_line_index * 16
            draw.text((x, y), char, self.black, self.font)

            blur_character = current_char_index < clear_start_index \
                          or current_char_index > clear_stop_index
            if blur_character:
                char_width, char_height = self.font.getsize(char)
                char_box = (x, y, x + char_width, y + char_height)
                char_tile = canvas.crop(char_box)
                char_tile = char_tile.filter(self.blur)
                canvas.paste(char_tile, char_box)

        image_contents = BytesIO()
        canvas.save(image_contents, format='PNG')
        image_contents.seek(0)
        return image_contents

    def render_base64(self):
        image = self.render().getvalue()
        return b64encode(image).decode('utf-8')
