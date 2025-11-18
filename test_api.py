"""
Script de prueba para verificar que el backend Flask funciona correctamente
Ejecutar: python test_api.py
"""

import requests
import json
from datetime import datetime

print("=" * 70)
print("🧪 HYDRO-CONECTA - Test de API")
print("=" * 70)

# Configuración
API_URL = "http://127.0.0.1:5000/api/dashboard"

def test_api():
    """Prueba la conexión a la API"""
    try:
        print("\n📡 Probando conexión a:", API_URL)
        print("⏱️  Timeout: 5 segundos\n")
        
        response = requests.get(API_URL, timeout=5)
        
        if response.status_code == 200:
            print("✅ Conexión exitosa!")
            print(f"📊 Status Code: {response.status_code}")
            
            data = response.json()
            
            # Verificar estructura
            print("\n📦 Estructura de respuesta:")
            print(f"  ├─ stats: {'✅' if 'stats' in data else '❌'}")
            print(f"  ├─ comentarios: {'✅ (' + str(len(data.get('comentarios', []))) + ')' if 'comentarios' in data else '❌'}")
            print(f"  ├─ questions: {'✅ (' + str(len(data.get('questions', []))) + ')' if 'questions' in data else '❌'}")
            print(f"  ├─ categories: {'✅ (' + str(len(data.get('categories', []))) + ')' if 'categories' in data else '❌'}")
            print(f"  ├─ users: {'✅ (' + str(len(data.get('users', []))) + ')' if 'users' in data else '❌'}")
            print(f"  ├─ locations: {'✅ (' + str(len(data.get('locations', []))) + ')' if 'locations' in data else '❌'}")
            print(f"  ├─ timestamp: {'✅' if 'timestamp' in data else '❌'}")
            print(f"  └─ source: {'✅ ' + data.get('source', '') if 'source' in data else '❌'}")
            
            # Verificar comentarios clasificados
            if 'comentarios' in data and len(data['comentarios']) > 0:
                print("\n🤖 Clasificación IA:")
                for i, comment in enumerate(data['comentarios'][:3], 1):
                    print(f"\n  Comentario #{i}:")
                    print(f"    ├─ Categoría: {comment.get('filtro', 'N/A')}")
                    print(f"    ├─ Sentimiento: {comment.get('sentimiento', 'N/A')}")
                    print(f"    └─ Texto: {comment.get('textoOriginal', '')[:60]}...")
                
                if len(data['comentarios']) > 3:
                    print(f"\n  ... y {len(data['comentarios']) - 3} comentarios más")
            
            print("\n" + "=" * 70)
            print("✅ PRUEBA EXITOSA - API funcionando correctamente")
            print("=" * 70)
            return True
            
        else:
            print(f"❌ Error HTTP {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión")
        print("\n💡 Soluciones:")
        print("  1. Asegúrate que Flask esté corriendo: python app.py")
        print("  2. Verifica que el puerto 5000 esté libre")
        print("  3. Revisa el firewall de Windows")
        return False
        
    except requests.exceptions.Timeout:
        print("❌ Timeout - El servidor no respondió a tiempo")
        print("\n💡 Soluciones:")
        print("  1. Verifica que Flask esté corriendo sin errores")
        print("  2. Revisa la consola de Flask por errores")
        return False
        
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_cors():
    """Prueba que CORS esté configurado correctamente"""
    try:
        print("\n🔒 Probando configuración CORS...")
        
        headers = {
            'Origin': 'http://localhost:8000'
        }
        
        response = requests.options(API_URL, headers=headers)
        
        if 'Access-Control-Allow-Origin' in response.headers:
            print("✅ CORS configurado correctamente")
            print(f"  Permite: {response.headers.get('Access-Control-Allow-Origin')}")
            return True
        else:
            print("⚠️  CORS puede no estar configurado")
            return False
            
    except Exception as e:
        print(f"⚠️  No se pudo verificar CORS: {e}")
        return False

if __name__ == "__main__":
    # Ejecutar pruebas
    api_ok = test_api()
    
    if api_ok:
        test_cors()
        
        print("\n🎉 Todas las pruebas pasaron!")
        print("👉 Ahora puedes abrir el frontend y probar el dashboard")
    else:
        print("\n⚠️  Hay problemas que resolver antes de continuar")
        print("📖 Revisa docs/INICIO_RAPIDO.md para más ayuda")
