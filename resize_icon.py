
from PIL import Image
import os
import sys

def resize_image(input_path, output_path, size=(1024, 1024)):
    try:
        if not os.path.exists(input_path):
            print(f"Erro: Arquivo não encontrado: {input_path}")
            return

        with Image.open(input_path) as img:
            # Converter para RGB se necessário (para salvar como JPG/PNG sem alfa se for o caso, mas PNG suporta RGBA)
            img = img.convert("RGBA")
            
            # Redimensionar usando LANCZOS para alta qualidade
            img_resized = img.resize(size, Image.Resampling.LANCZOS)
            
            # Salvar
            img_resized.save(output_path, "PNG")
            print(f"Sucesso! Imagem salva em: {output_path} ({size[0]}x{size[1]})")

    except Exception as e:
        print(f"Erro ao processar imagem: {e}")

if __name__ == "__main__":
    # Exemplo de uso: python resize_icon.py "caminho/da/imagem.png"
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
        output_file = "icon_1024x1024.png"
        resize_image(input_file, output_file)
    else:
        print("Arraste uma imagem para este script ou forneça o caminho como argumento.")
