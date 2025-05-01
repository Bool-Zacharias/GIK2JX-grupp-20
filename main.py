import pandas as pd
from flask import Flask, jsonify
from sklearn.cluster import KMeans
from flask import Flask, render_template
import numpy as np

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/api/clusters")
def api_clusters():
    # Läs in CSV-filen
    df = pd.read_csv("static/data/school_locations.csv")

    # Byt namn på kolumner
    df = df.rename(columns={"ycoord": "lat", "xcoord": "lon"})

    # Antal kluster sparas i lista 
    sse = [] # sum of squarred errors
    coords = df[["lat", "lon"]]

    # Skapa KMeans-kluster (Elbow metoden, kMeans labb 1 AI kursen)
    for k in range(2,7):
        kMeans = KMeans(n_clusters=k, random_state=42)
        kMeans.fit(coords)
        sse.append(kMeans.inertia_)
    
    sse_diff = np.diff(sse)
    optimal_k = np.argmin(sse_diff) + 2 # Börjar på 0 därför + 2

    kMeans = KMeans(n_clusters=optimal_k, random_state=42)
    df["cluster"] = kMeans.fit_predict(coords)

    # Skicka tillbaka JSON-objekt
    return jsonify({
        'optimal_k': int(optimal_k),
        'clusters': df.to_dict(orient="records")
    })

if __name__ == '__main__':
    app.run(debug=True)

# df["cluster"] = kMeans.labels_