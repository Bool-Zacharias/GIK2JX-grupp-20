from flask import Flask, render_template, jsonify
import pandas as pd
from sklearn.cluster import KMeans

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/clusters")
def get_clusters():
    df = pd.read_csv("/data/school_locations.csv")


    df = df.rename(columns={"ycoord": "lat", "xcoord": "lon"})

    coords = df[["lat", "lon"]]
    kmeans = KMeans(n_clusters=3, random_state=42).fit(coords)
    df["cluster"] = kmeans.labels_

    return jsonify(df.to_dict(orient="records"))

if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=5000)
