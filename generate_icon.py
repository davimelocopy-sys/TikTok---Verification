
from PIL import Image, ImageDraw, ImageFont
import os

def create_tiktok_style_icon(output_path="tiktok_antiban_icon.png"):
    # Configurações
    size = 1024
    bg_color = (0, 0, 0) # Preto
    cyan = (0, 242, 234) # TikTok Cyan
    magenta = (255, 0, 80) # TikTok Magenta
    white = (255, 255, 255) # Branco

    # Criar imagem base
    img = Image.new('RGB', (size, size), color=bg_color)
    draw = ImageDraw.Draw(img)

    # Coordenadas do centro
    center = size // 2
    
    # Desenhar Círculos "Glitch" (Estilo TikTok)
    # Círculo Ciano (deslocado para esquerda/topo)
    offset = 20
    draw.ellipse((100 - offset, 100 - offset, 924 - offset, 924 - offset), outline=cyan, width=40)
    
    # Círculo Magenta (deslocado para direita/baixo)
    draw.ellipse((100 + offset, 100 + offset, 924 + offset, 924 + offset), outline=magenta, width=40)

    # Círculo Branco Central
    draw.ellipse((100, 100, 924, 924), outline=white, width=20)

    # Desenhar Símbolo de Escudo Simplificado no Centro
    # Coordenadas do escudo
    shield_points = [
        (center, 250), # Topo
        (800, 350),   # Direita Superior
        (800, 600),   # Direita Inferior (começa a curvar)
        (center, 850), # Ponta Inferior
        (224, 600),   # Esquerda Inferior
        (224, 350),   # Esquerda Superior
    ]
    
    # Preencher Escudo com gradiente simulado (linhas)
    draw.polygon(shield_points, fill=(20, 20, 20), outline=white, width=15)
    
    # Desenhar "AB" (AntiBan) no centro se possível, ou apenas formas
    # Como não garantimos fontes, vamos desenhar formas geométricas para "AB"
    
    # Letra A (Simulada)
    draw.line((400, 650, 512, 400), fill=cyan, width=25) # Perna esq
    draw.line((512, 400, 624, 650), fill=cyan, width=25) # Perna dir
    draw.line((450, 580, 580, 580), fill=magenta, width=20) # Traço meio

    # Salvar
    img.save(output_path)
    print(f"Ícone gerado com sucesso: {output_path}")

if __name__ == "__main__":
    create_tiktok_style_icon()
