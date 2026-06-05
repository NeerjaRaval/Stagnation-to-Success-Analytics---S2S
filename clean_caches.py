import os
import shutil

def clean():
    print("Cleaning up temporary caches...")
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    count = 0
    for root, dirs, files in os.walk(current_dir):
        # Clean __pycache__
        if "__pycache__" in dirs:
            pycache_path = os.path.join(root, "__pycache__")
            shutil.rmtree(pycache_path)
            count += 1
            
        # Clean .pytest_cache if it exists
        if ".pytest_cache" in dirs:
            pytest_path = os.path.join(root, ".pytest_cache")
            shutil.rmtree(pytest_path)
            count += 1
            
    print(f"Cleaned {count} cache directories.")

if __name__ == "__main__":
    clean()
