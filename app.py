import streamlit as st
import streamlit.components.v1 as components
import os
import re

# Set page configuration
st.set_page_config(
    page_title="Stagnation-to-Success (S2S) Analytics",
    page_icon="logo.png",
    layout="wide"
)

# Hide Streamlit default chrome (header, footer, menu) for a clean full-screen React experience
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        header {visibility: hidden;}
        footer {visibility: hidden;}
        .stApp > div:first-child {padding-top: 0;}
        iframe {border: none !important;}
    </style>
""", unsafe_allow_html=True)

def build_inline_html():
    """
    Reads the compiled React build (index.html + JS + CSS) and inlines
    everything into a single self-contained HTML string.
    This eliminates all external asset loading issues.
    """
    dist_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend", "dist")
    index_path = os.path.join(dist_dir, "index.html")

    if not os.path.exists(index_path):
        return None

    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Find and inline the CSS file
    css_match = re.search(r'<link\s+rel="stylesheet"\s+crossorigin\s+href="\./(assets/[^"]+)">', html)
    if css_match:
        css_path = os.path.join(dist_dir, css_match.group(1))
        if os.path.exists(css_path):
            with open(css_path, "r", encoding="utf-8") as f:
                css_content = f.read()
            # Replace the <link> tag with an inline <style> block
            html = html.replace(css_match.group(0), f"<style>{css_content}</style>")

    # Find and inline the JS file
    js_match = re.search(r'<script\s+type="module"\s+crossorigin\s+src="\./(assets/[^"]+)">\s*</script>', html)
    if js_match:
        js_path = os.path.join(dist_dir, js_match.group(1))
        if os.path.exists(js_path):
            with open(js_path, "r", encoding="utf-8") as f:
                js_content = f.read()
            # Replace the <script src> tag with an inline <script> block
            html = html.replace(js_match.group(0), f"<script type=\"module\">{js_content}</script>")

    return html

# Build the inlined HTML
html_content = build_inline_html()

if html_content:
    # Render the entire React app as a single self-contained HTML blob
    # No external file references = no loading issues
    components.html(html_content, height=950, scrolling=True)
else:
    st.error("React build not found! Please run 'npm run build' inside your frontend folder first.")
