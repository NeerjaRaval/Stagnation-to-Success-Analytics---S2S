import streamlit as st
import streamlit.components.v1 as components
import os

# Set page configuration for full screen React dashboard
st.set_page_config(
    page_title="Stagnation-to-Success (S2S) Analytics",
    page_icon="logo.png",
    layout="wide"
)

# Define the path to the React build 'dist' folder
frontend_dist = os.path.join(os.path.dirname(__file__), "frontend", "dist")

if os.path.exists(frontend_dist):
    # declare_component serves the entire 'dist' folder and handles static assets
    # Now that we send the ready and setFrameHeight messages from React, this loads cleanly.
    react_app = components.declare_component("s2s_react_app", path=frontend_dist)
    react_app()
else:
    st.error("React build not found! Please run 'npm run build' inside your frontend folder first.")
