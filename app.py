import streamlit as st
import streamlit.components.v1 as components
import os
import shutil

# Set page configuration for full screen React dashboard
st.set_page_config(
    page_title="Stagnation-to-Success (S2S) Analytics",
    page_icon="logo.png",
    layout="wide"
)

# Get streamlit static directory and define s2s target path
import streamlit
streamlit_static_path = os.path.join(os.path.dirname(streamlit.__file__), "static")
s2s_static_path = os.path.join(streamlit_static_path, "s2s")

# Define build folder
frontend_dist = os.path.join(os.path.dirname(__file__), "frontend", "dist")

if os.path.exists(frontend_dist):
    # Copy build folder to Streamlit's internal static file server
    try:
        if os.path.exists(s2s_static_path):
            shutil.rmtree(s2s_static_path)
        shutil.copytree(frontend_dist, s2s_static_path)
    except Exception as e:
        # Log error in case of permission issues
        st.write(f"Static sync notice: {e}")

    # Serve the React app via a standard iframe served directly from Streamlit's webserver root
    components.iframe("/s2s/index.html", height=950, scrolling=True)
else:
    st.error("React build not found! Please run 'npm run build' inside your frontend folder first.")
