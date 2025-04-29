import os
import pandas as pd
from flask import Flask, jsonify
from sklearn.cluster import KMeans

app = Flask(__name__)

@app.route("/api/clusters")
def api_clusters():
    try:
        # ✅ Rätt sökväg
        csv_path = os.path.join("static", "data", "school_locations.csv")
        
        # Läs CSV
        df = pd.read_csv(csv_path)

        # Kontroll att kolumnerna finns
        if not all(col in df.columns for col in ["lat", "lon"]):
            return jsonify({"error": "CSV saknar kolumnerna 'lat' och 'lon'"}), 400

        # K-means clustering
        kmeans = KMeans(n_clusters=5, random_state=0)
        df['cluster'] = kmeans.fit_predict(df[['lat', 'lon']])

        # Gör till JSON
        data = df[['Name', 'lat', 'lon', 'cluster']].to_dict(orient="records")
        return jsonify(data)
    
    except Exception as e:
        print("🚨 FEL I /api/clusters:", e)
        return jsonify({"error": "Serverfel"}), 500
