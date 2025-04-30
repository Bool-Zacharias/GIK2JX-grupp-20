import pandas as pd
from flask import Flask, jsonify
from sklearn.cluster import KMeans
from flask import Flask, render_template


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

    # Skapa KMeans-kluster
    coords = df[["lat", "lon"]]
    kMeans = KMeans(n_clusters=3, random_state=42).fit(coords)
    df["cluster"] = kMeans.labels_

    # Skicka tillbaka JSON-objekt
    return jsonify(df.to_dict(orient="records"))

if __name__ == '__main__':
    app.run(debug=True)

