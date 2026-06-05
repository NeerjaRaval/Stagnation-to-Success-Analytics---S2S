import streamlit as st
import streamlit.components.v1 as components
import os

# Set page configuration for full screen React dashboard
st.set_page_config(
    page_title="Stagnation-to-Success (S2S) Analytics",
    page_icon="📊",
    layout="wide"
)

# Define the path to the React build 'dist' folder
frontend_dist = os.path.join(os.path.dirname(__file__), "frontend", "dist")

if os.path.exists(frontend_dist):
    # declare_component serves the entire 'dist' folder (including js/css assets)
    # and renders index.html inside an iframe cleanly.
    react_app = components.declare_component("s2s_react_app", path=frontend_dist)
    
    # Render the React frontend full-width
    react_app(height=950)
else:
    st.error("React build not found! Please run 'npm run build' inside your frontend folder first.")
