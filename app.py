import os
import pandas as pd
from flask import Flask, jsonify
from sklearn.cluster import KMeans
from flask import Flask, jsonify, render_template


app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/api/clusters")
def api_clusters():
    df = pd.read_csv("static/data/school_locations.csv")

    df = df.rename(columns={"ycoord": "lat", "xcoord": "lon"})

    coords = df[["lat", "lon"]]
    kMeans = KMeans(n_clusters=3, random_state=50).fit(coords)
    df["clusters"] = kMeans.labels_

    return jsonify(df.to_dict(orient="records"))

